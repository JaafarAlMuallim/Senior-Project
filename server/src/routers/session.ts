import { SessionStatus } from "@prisma/postgres/client";
import { z } from "zod";
import { adminProcedure, authProcedure, router, tutorProcedure } from "../trpc";

export const sessionRouter = router({
  createSession: tutorProcedure
    .input(
      z.object({
        time: z.string(),
        courseId: z.string(),
        date: z.coerce.date(),
        courseName: z.string(),
        requestedBy: z.string().nullable(),
        status: z.nativeEnum(SessionStatus).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { time, courseId, date, courseName, requestedBy, status } = input;
      try {
        const hours = time.split(":")[0];
        const minutes = time.split(":")[1];
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        const session = await ctx.postgresClient.session.create({
          data: {
            tutorId: ctx.user?.Tutor[0].id!,
            courseId,
            startTime: date,
            requestedBy,
            date,
            title: `${courseName} - ${date.getDay()}/${
              date.getMonth() + 1
            }/${date.getFullYear()} - ${time}`,
            status,
          },
        });
        return session;
      } catch (error) {
        console.log(error);
        throw new Error("Error creating session");
      }
    }),
  getSessions: adminProcedure.query(async ({ ctx }) => {
    const sessions = await ctx.postgresClient.session.findMany();
    return sessions;
  }),
  changeSessionStatus: tutorProcedure
    .input(
      z.object({
        sessionId: z.string(),
        status: z.nativeEnum(SessionStatus),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { sessionId, status } = input;
      const session = await ctx.postgresClient.session.update({
        where: {
          id: sessionId,
        },
        data: {
          status,
        },
      });
      return session;
    }),

  getTutorSessions: tutorProcedure.query(async ({ ctx }) => {
    const sessions = await ctx.postgresClient.session.findMany({
      where: {
        tutorId: ctx.user?.Tutor[0].id!,
      },
    });
    return sessions;
  }),
  getCourseSessions: authProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { courseId } = input;
      const sessions = await ctx.postgresClient.session.findMany({
        where: {
          courseId,
        },
      });
      return sessions;
    }),
  getPendingSessionTutorCount: tutorProcedure.query(async ({ ctx }) => {
    try {
      const sessions = await ctx.postgresClient.session.count({
        where: {
          tutorId: ctx.user?.Tutor[0].id!,
          status: SessionStatus.PENDING,
        },
      });
      return sessions;
    } catch (e) {
      console.log(e);
      throw new Error("Error");
    }
  }),
  getPendingSessionTutor: tutorProcedure.query(async ({ ctx }) => {
    const sessions = await ctx.postgresClient.session.findMany({
      where: {
        tutorId: ctx.user?.Tutor[0].id!,
        status: SessionStatus.PENDING,
      },
      include: {
        requester: true,
        course: true,
      },
    });
    return sessions;
  }),
  getAcceptedSessionTutor: authProcedure.query(async ({ ctx }) => {
    const sessions = await ctx.postgresClient.session.findMany({
      where: {
        tutorId: ctx.user?.Tutor[0].id!,
        status: SessionStatus.ACCEPTED,
      },
      include: {
        requester: true,
        course: true,
      },
    });
    return sessions;
  }),
});

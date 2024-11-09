import { SessionStatus } from "@prisma/postgres/client";
import { z } from "zod";
import { postgresClient } from "../db";
import { publicProcedure, router } from "../trpc";

export const sessionRouter = router({
  createSession: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        tutorId: z.string(),
        time: z.string(),
        courseId: z.string(),
        date: z.coerce.date(),
        courseName: z.string(),
        requestedBy: z.string().nullable(),
        status: z.nativeEnum(SessionStatus).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { tutorId, time, courseId, date, courseName, requestedBy, status } =
        input;
      try {
        const hours = time.split(":")[0];
        const minutes = time.split(":")[1];
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        const session = await postgresClient.session.create({
          data: {
            tutorId,
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
  getSessions: publicProcedure.query(async () => {
    const sessions = await postgresClient.session.findMany();
    return sessions;
  }),
  changeSessionStatus: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        status: z.nativeEnum(SessionStatus),
      }),
    )
    .mutation(async ({ input }) => {
      const { sessionId, status } = input;
      const session = await postgresClient.session.update({
        where: {
          id: sessionId,
        },
        data: {
          status,
        },
      });
      return session;
    }),

  getTutorSessions: publicProcedure
    .input(
      z.object({
        tutorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { tutorId } = input;
      const sessions = await postgresClient.session.findMany({
        where: {
          tutorId,
        },
      });
      return sessions;
    }),
  getCourseSessions: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { courseId } = input;
      const sessions = await postgresClient.session.findMany({
        where: {
          courseId,
        },
      });
      return sessions;
    }),
  getPendingSessionTutorCount: publicProcedure
    .input(
      z.object({
        tutorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { tutorId } = input;
      try {
        const sessions = await postgresClient.session.count({
          where: {
            tutorId,
            status: SessionStatus.PENDING,
          },
        });
        return sessions;
      } catch (e) {
        console.log(e);
        throw new Error("Error");
      }
    }),
  getPendingSessionTutor: publicProcedure
    .input(
      z.object({
        tutorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { tutorId } = input;
      const sessions = await postgresClient.session.findMany({
        where: {
          tutorId,
          status: SessionStatus.PENDING,
        },
        include: {
          requester: true,
          course: true,
        },
      });
      return sessions;
    }),
  getAcceptedSessionTutor: publicProcedure
    .input(
      z.object({
        tutorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { tutorId } = input;
      const sessions = await postgresClient.session.findMany({
        where: {
          tutorId,
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

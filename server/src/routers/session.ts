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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("CREATE SESSION");
      const { tutorId, time, courseId, date } = input;
      console.log(input);
      try {
        const courseName = await postgresClient.course.findFirst({
          where: {
            id: courseId,
          },
          select: {
            name: true,
          },
        });
        const hours = time.split(":")[0];
        const minutes = time.split(":")[1];
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        const session = await postgresClient.session.create({
          data: {
            tutorId,
            courseId,
            startTime: date,
            date,
            title: `${courseName} - ${date.getDay()}/${
              date.getMonth() + 1
            }/${date.getFullYear()} - ${time}`,
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
});

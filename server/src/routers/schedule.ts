import { z } from "zod";
import { db } from "../db";
import { publicProcedure } from "../trpc";

export const scheduleRouter = {
  createSchedule: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        semester: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const registration = await db.registration.findFirst({
        where: {
          courseId: input.courseId,
          userId: input.userId,
          semester: input.semester,
        },
      });

      if (registration) {
        throw new Error("Registration already exists");
      }

      return await db.registration.create({
        data: {
          courseId: input.courseId,
          userId: input.userId,
          semester: input.semester,
        },
      });
    }),
};

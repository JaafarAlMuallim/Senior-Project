import { z } from "zod";
import { postgresClient } from "../db";
import { authProcedure, publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
  createSchedule: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        sectionId: z.string(),
        semester: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, semester, sectionId } = input;
      const registration = await postgresClient.registration.findFirst({
        where: {
          userId, // TODO: Need to replace with ctx.user.id later
          semester,
          sectionId,
        },
      });

      if (registration) {
        throw new Error("Registration already exists");
      }

      return await postgresClient.registration.create({
        data: {
          userId, // TODO: Need to replace with ctx.user.id later
          sectionId,
          semester,
        },
      });
    }),
  getSchedule: authProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        semester: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { semester } = input;
      console.log("SCHEDULE", ctx.user?.id);
      try {
        const registrations = await postgresClient.registration.findMany({
          where: {
            userId: ctx.user?.id,
            semester,
          },
          include: {
            section: {
              include: {
                course: true,
              },
            },
          },
        });
        return registrations;
      } catch (error) {
        console.log(error);
        throw new Error("Error getting schedule");
      }
    }),

  getSemesters: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const uniqueSemesters = await postgresClient.registration.findMany({
        where: {
          userId: input.userId,
        },
        select: {
          semester: true,
        },
        distinct: ["semester"],
      });
      return uniqueSemesters.map((registration) => registration.semester);
    }),
});

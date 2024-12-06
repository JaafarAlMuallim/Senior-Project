import { z } from "zod";
import { authProcedure, router } from "../trpc";

export const scheduleRouter = router({
  createSchedule: authProcedure
    .input(
      z.object({
        sectionId: z.string(),
        semester: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { semester, sectionId } = input;
      const registration = await ctx.postgresClient.registration.findFirst({
        where: {
          userId: ctx.user?.id,
          semester,
          sectionId,
        },
      });

      if (registration) {
        throw new Error("Registration already exists");
      }

      return await ctx.postgresClient.registration.create({
        data: {
          userId: ctx.user?.id!,
          sectionId,
          semester,
        },
      });
    }),
  getSchedule: authProcedure
    .input(
      z.object({
        semester: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { semester } = input;
      try {
        const registrations = await ctx.postgresClient.registration.findMany({
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

  getSemesters: authProcedure.query(async ({ ctx }) => {
    const uniqueSemesters = await ctx.postgresClient.registration.findMany({
      where: {
        userId: ctx.user?.id,
      },
      select: {
        semester: true,
      },
      distinct: ["semester"],
    });
    return uniqueSemesters.map((registration) => registration.semester);
  }),
});

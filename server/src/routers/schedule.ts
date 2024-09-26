import { z } from "zod";
import { db } from "../db";
import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
  createSchedule: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        courseId: z.string(),
        sectionId: z.string(),
        semester: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const registration = await db.registration.findFirst({
        where: {
          section: {
            courseId: input.courseId,
          },

          userId: input.userId, // TODO: Need to replace with ctx.user.id later
          semester: input.semester,
        },
      });

      if (registration) {
        throw new Error("Registration already exists");
      }

      return await db.registration.create({
        data: {
          sectionId: input.sectionId,
          userId: input.userId, // TODO: Need to replace with ctx.user.id later
          semester: input.semester,
        },
      });
    }),
});

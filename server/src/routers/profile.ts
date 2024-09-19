import { db } from "../db";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  standing: z.string(),
  university: z.string(),
  phone: z.string(),
});

export const profileRouter = {
  get: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { clerkId } = input;
      const profile = await db.profile.findFirst({
        where: {
          userId: clerkId,
        },
        include: {
          user: true,
        },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      return profile;
    }),
  update: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        data: profileSchema.partial(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { clerkId, data } = input;
      const profile = await db.profile.update({
        where: {
          userId: clerkId,
        },
        data,
      });
      return profile;
    }),
};

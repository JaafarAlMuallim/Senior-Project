import { db } from "../db";
import { trpc } from "../trpc";
import { z } from "zod";

const proflieSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  standing: z.string(),
});

export const updateProfile = trpc.procedure
  .input(
    z.object({
      id: z.string(),
      data: proflieSchema.partial(),
    })
  )
  .mutation(async ({ input }) => {
    const { id, data } = input;
    try {
      const profile = await db.profile.findUnique({
        where: {
          id,
        },
      });
      if (!profile) {
        throw new Error("Profile does not exist");
      }
      await db.profile.update({
        where: {
          id,
        },
        data,
      });
      return profile;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

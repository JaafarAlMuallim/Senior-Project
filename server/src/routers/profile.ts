import { z } from "zod";
import { db } from "../db";
import { publicProcedure, router } from "../trpc";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  standing: z.string(),
  university: z.string(),
  phone: z.string(),
  name: z.string(),
});

export const profileRouter = router({
  get: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log("GET PROFILE");
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
      try {
        const profile = await db.profile.update({
          where: {
            userId: clerkId,
          },
          data: {
            major: data.major,
            standing: data.standing,
            university: data.university,
            phone: data.phone,
            user: {
              update: {
                name: data.name,
              },
            },
          },
        });
        return profile;
      } catch (e) {
        console.log(e);
        throw new Error("Profile not found");
      }
    }),
});

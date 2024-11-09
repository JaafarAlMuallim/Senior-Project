import { z } from "zod";
import { postgresClient } from "../db";
import { publicProcedure, router } from "../trpc";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  standing: z.string(),
  university: z.string(),
  phone: z.string(),
});

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        clerkId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, name, clerkId } = input;
      try {
        if (!email || !name || !clerkId) {
          throw new Error("Missing required fields");
        }
        const checker = await postgresClient.user.findUnique({
          where: {
            clerkId,
          },
        });
        if (checker) {
          throw new Error("Clerk ID already exists, Login");
        }
        const data = await postgresClient.user.create({
          data: {
            email,
            name,
            clerkId,
          },
        });
        const profile = await postgresClient.profile.create({
          data: {
            userId: clerkId,
          },
        });
        const usr = await postgresClient.user.update({
          where: {
            clerkId,
          },
          data: {
            profileId: profile.id,
          },
        });
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});

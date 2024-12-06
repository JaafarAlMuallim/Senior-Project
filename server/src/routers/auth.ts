import { z } from "zod";
import { authProcedure, publicProcedure, router } from "../trpc";

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
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, name, clerkId } = input;
      try {
        if (!email || !name || !clerkId) {
          throw new Error("Missing required fields");
        }
        const checker = await ctx.postgresClient.user.findUnique({
          where: {
            clerkId,
          },
        });
        if (checker) {
          throw new Error("Clerk ID already exists, Login");
        }

        const data = await ctx.postgresClient.user.create({
          data: {
            email,
            name,
            clerkId,
          },
        });

        const profile = await ctx.postgresClient.profile.create({
          data: {
            userId: data.id,
          },
        });
        await ctx.postgresClient.user.update({
          where: {
            id: data.id,
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
  currentUser: authProcedure.query(async ({ ctx }) => {
    // omit password, groupId, createdAt, updatedAt, clerkId
    if (!ctx.user) {
      throw new Error("User not found");
    }
    const { password, groupId, createdAt, updatedAt, clerkId, ...user } =
      ctx.user;
    return user;
  }),
});

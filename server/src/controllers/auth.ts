import { db } from "../db";
import { trpc } from "../trpc";
import { z } from "zod";

export const signUp = trpc.procedure
  .input(
    z.object({
      email: z.string(),
      name: z.string(),
      clerkId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const { email, name, clerkId } = input;
    try {
      if (!email || !name || !clerkId) {
        throw new Error("Missing required fields");
      }
      const checker = await db.user.findUnique({
        where: {
          clerkId,
        },
      });
      if (checker) {
        throw new Error("Clerk ID already exists, Login");
      }
      const data = await db.user.create({
        data: {
          email,
          name,
          clerkId,
        },
      });
      await db.profile.create({
        data: {
          user: {
            connect: {
              id: data.id,
            },
          },
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

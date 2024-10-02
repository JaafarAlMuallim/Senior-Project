import { z } from "zod";
import { db } from "../db";
import { publicProcedure, router } from "../trpc";

export const groupRouter = router({
  getUserGroups: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      try {
        const groups = await db.participant.findMany({
          where: {
            userId,
          },
          include: {
            group: true,
          },
        });
        return groups;
      } catch (error) {
        console.log(error);
        throw new Error("Error getting user groups");
      }
    }),
});

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
      } catch (error) {
        console.log(error);
        throw new Error("Error getting user groups");
      }
    }),
  getGroup: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { groupId } = input;
      try {
        console.log("groupId", groupId);
        const group = await db.group.findUnique({
          where: {
            id: groupId,
          },
        });
        console.log("group", group);
        return group;
      } catch (error) {
        console.log(error);
        throw new Error("Error getting group");
      }
    }),
});

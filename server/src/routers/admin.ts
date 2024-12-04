import { z } from "zod";
import {
  authProcedure,
  router,
  adminProcedure,
  publicProcedure,
} from "../trpc";
import { clerkClient } from "@clerk/express";

export const adminRouter = router({
  userData: publicProcedure.query(async ({ ctx }) => {
    try {
      const [userCount, allUsers, monthUsers, activeUsers] = await Promise.all([
        ctx.postgresClient.user.count(),
        ctx.postgresClient.user.findMany(),
        ctx.postgresClient.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // One month ago
              lt: new Date(), // Current date
            },
          },
        }),
        clerkClient.users.getCount(),
      ]);

      return {
        userCount,
        allUsers,
        monthUsers,
        activeUsers,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  reportsData: publicProcedure.query(async ({ ctx }) => {
    try {
      const [reportCount, monthReports, closedReports, mostReportedCategory] =
        await Promise.all([
          ctx.postgresClient.report.count(),
          ctx.postgresClient.report.count({
            where: {
              createdAt: {
                gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // One month ago
                lt: new Date(), // Current date
              },
            },
          }),
          ctx.postgresClient.report.count({
            where: {
              status: false,
            },
          }),
          ctx.postgresClient.report.groupBy({
            by: ["category"],
          }),
        ]);

      return {
        reportCount,
        monthReports,
        closedReports,
        mostReportedCategory,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  msgData: publicProcedure.query(async ({ ctx }) => {
    try {
      const [msgCount, monthMsg, groupMsg, aiMsg, msgGroupByDay] =
        await Promise.all([
          ctx.mongoClient.message.count(),
          ctx.mongoClient.message.count({
            where: {
              createdAt: {
                gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // One month ago
                lt: new Date(), // Current date
              },
            },
          }),
          ctx.mongoClient.message.count({
            where: {
              group: {
                type: "GROUP",
              },
            },
          }),
          ctx.mongoClient.message.count({
            where: {
              group: {
                type: "AI",
              },
            },
          }),
          ctx.mongoClient.message.groupBy({
            by: ["createdAt"],
          }),
        ]);
      type GroupedMessages = Record<string, typeof msgGroupByDay>;

      const groupByDay = msgGroupByDay.reduce((acc, curr) => {
        const date = new Date(curr.createdAt).toDateString(); // Convert createdAt to a readable date string

        // Initialize the group if it doesn't exist
        if (!acc[date]) {
          acc[date] = [];
        }

        // Add the current message to the group
        acc[date].push(curr);

        return acc;
      }, {} as GroupedMessages);

      return {
        msgCount,
        monthMsg,
        groupMsg,
        aiMsg,
        groupByDay,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  updateReport: adminProcedure
    .input(
      z.object({
        status: z.boolean(),
        reportId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { reportId, status } = input;
      try {
        const report = await ctx.postgresClient.report.update({
          where: {
            id: reportId,
          },
          data: {
            status,
          },
        });

        return report;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
  removeUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      try {
        const user = await ctx.postgresClient.user.delete({
          where: {
            id: userId,
          },
        });

        await clerkClient.users.deleteUser(userId);

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});

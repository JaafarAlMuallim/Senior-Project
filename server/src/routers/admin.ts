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
      const [
        userCount,
        tutorCount,
        adminCount,
        allUsers,
        monthUsers,
        activeUsers,
      ] = await Promise.all([
        ctx.postgresClient.user.count(),
        ctx.postgresClient.tutor.count(),
        ctx.postgresClient.admin.count(),
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
        tutorCount,
        adminCount,
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
      const [reportCount, monthReports, closedReports, allReports, byCategory] =
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
          ctx.postgresClient.report.findMany(),
          ctx.postgresClient.report.groupBy({
            by: ["category"],
          }),
        ]);

      type ReportByCategory = Record<string, number>;
      const allByCategory = byCategory.reduce(
        (acc, curr: { category: string }) => {
          acc[curr.category] = curr.category.length;
          return acc;
        },
        {} as ReportByCategory
      );

      const allByCategoryArr = Object.entries(allByCategory).map(
        ([category, count]) => ({
          category,
          count,
        })
      );

      return {
        reportCount,
        monthReports,
        closedReports,
        allReports,
        allByCategory,
        allByCategoryArr,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  msgData: publicProcedure.query(async ({ ctx }) => {
    try {
      const [
        msgCount,
        monthMsg,
        groupMsg,
        aiMsg,
        msgGroupByDay,
        msgCountByGroup,
      ] = await Promise.all([
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
        ctx.mongoClient.message.groupBy({
          by: ["groupId"],
        }),
      ]);
      type GroupedMessages = Record<
        string,
        Array<{
          createdAt: string; // Serialize Date to ISO string
        }>
      >;

      const groupByDay = msgGroupByDay.reduce(
        (acc, curr: { createdAt: Date }) => {
          const date = new Date(curr.createdAt).toDateString(); // Convert createdAt to a readable date string

          // Initialize the group if it doesn't exist
          if (!acc[date]) {
            acc[date] = [];
          }

          // Add the current message to the group
          acc[date].push({ createdAt: curr.createdAt.toISOString() });

          return acc;
        },
        {} as GroupedMessages
      );
      const groupByDayArr = Object.entries(groupByDay).map(
        ([date, messages]) => ({
          date,
          messages,
        })
      );

      type MsgCountByGroup = Record<string, number>;
      const allCountByGroup = msgCountByGroup.reduce(
        (acc, curr: { groupId: string }) => {
          acc[curr.groupId] = curr.groupId.length;
          return acc;
        },
        {} as MsgCountByGroup
      );
      const messageCountByGroup: {
        groupId: string;
        count: number;
      }[] = Object.entries(allCountByGroup).map(([groupId, count]) => ({
        groupId,
        count,
      }));

      return {
        msgCount,
        monthMsg,
        groupMsg,
        aiMsg,
        groupByDayArr,
        messageCountByGroup,
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

export type GroupByDayDTO = Record<
  string,
  Array<{
    createdAt: string; // Serialize Date to ISO string
  }>
>;

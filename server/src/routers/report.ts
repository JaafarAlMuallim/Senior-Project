import { z } from "zod";
import { authProcedure, router } from "../trpc";

import { ReportCategory } from "@prisma/postgres/client";
export const reportRouter = router({
  createReport: authProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        category: z.nativeEnum(ReportCategory),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { title, content, category } = input;
        const data = await ctx.postgresClient.report.create({
          data: {
            title,
            content,
            category,
          },
        });

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});

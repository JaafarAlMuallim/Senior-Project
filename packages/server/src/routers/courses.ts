import { db } from "../db";
import { publicProcedure } from "../trpc";

export const courseRouter = {
  getCourses: publicProcedure // TODO: Change to authProcedure
    .query(async () => {
      const courses = await db.course.findMany();
      return courses;
    }),
};

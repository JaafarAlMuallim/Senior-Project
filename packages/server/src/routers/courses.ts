import { db } from "../db";
import { publicProcedure, router } from "../trpc";

export const courseRouter = router({
  getCourses: publicProcedure // TODO: Change to authProcedure
    .query(async () => {
      const courses = await db.course.findMany();
      return courses;
    }),
});

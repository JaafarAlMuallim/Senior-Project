import { z } from "zod";
import { db } from "../db";
import { authProcedure, publicProcedure, router } from "../trpc";

export const courseRouter = router({
  getCourses: publicProcedure.query(async () => {
    const courses = await db.course.findMany();
    return courses;
  }),

  getCourse: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const course = await db.course.findUnique({ where: { id } });
      return course;
    }),

  getUserCourses: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      console.log(id);
      console.log(ctx);
      try {
        const enrolled = await db.registration.findMany({
          where: { userId: id },
          include: { section: { include: { course: true } } },
        });
        return enrolled;
      } catch (e) {
        console.log(e);
        throw new Error("Error");
      }
    }),
  // getUserCourses: authProcedure.query(async ({ ctx: { user } }) => {
  //   const enrolledCourses = await db.registration.findMany({
  //     where: { userId: user.id },
  //     include: { section: { include: { course: true } } },
  //   });
  //   return enrolledCourses;
  // }),
});

import { z } from "zod";
import { postgresClient } from "../db";
import { authProcedure, publicProcedure, router } from "../trpc";

export const courseRouter = router({
  getCourses: publicProcedure.query(async () => {
    const courses = await postgresClient.course.findMany();
    return courses;
  }),

  getCourse: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const course = await postgresClient.course.findUnique({ where: { id } });
      return course;
    }),

  getUserCourses: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      console.log(id);
      console.log(ctx);
      try {
        const enrolled = await postgresClient.registration.findMany({
          where: { userId: id },
          include: { section: { include: { course: true } } },
        });
        return enrolled;
      } catch (e) {
        console.log(e);
        throw new Error("Error");
      }
    }),
  addFiles: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        files: z.array(z.custom<File>()),
      }),
    )
    .mutation(async ({ input }) => {
      const { courseId, files } = input;
      console.log("addFiles", courseId, files[0]);
    }),
  // getUserCourses: authProcedure.query(async ({ ctx: { user } }) => {
  //   const enrolledCourses = await db.registration.findMany({
  //     where: { userId: user.id },
  //     include: { section: { include: { course: true } } },
  //   });
  //   return enrolledCourses;
  // }),
});

import { Category } from "@prisma/postgres/client";
import { z } from "zod";
import { authProcedure, router } from "../trpc";

export const courseRouter = router({
  getCourses: authProcedure.query(async ({ ctx }) => {
    const courses = await ctx.postgresClient.course.findMany();
    return courses;
  }),

  getCourse: authProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const course = await ctx.postgresClient.course.findUnique({
        where: { id },
      });
      return course;
    }),

  getUserCourses: authProcedure.query(async ({ ctx }) => {
    try {
      const enrolled = await ctx.postgresClient.registration.findMany({
        where: { userId: ctx.user?.id },
        include: { section: { include: { course: true } } },
      });
      return enrolled;
    } catch (e) {
      console.log(e);
      throw new Error("Error");
    }
  }),
  addMaterial: authProcedure
    .input(
      z.object({
        courseId: z.string(),
        name: z.string(),
        url: z.string(),
        category: z.nativeEnum(Category),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { courseId, name, url, category } = input;
      try {
        const material = await ctx.postgresClient.material.create({
          data: {
            courseId,
            name,
            url,
            category,
          },
        });
        return material.id;
      } catch (e) {
        console.log(e);
        return {
          courseId: null,
          error: "Failed to create material",
        };
      }
    }),

  getMaterial: authProcedure
    .input(z.object({ courseId: z.string(), category: z.string() }))
    .query(async ({ input, ctx }) => {
      const { courseId, category } = input;
      const cat = category.toUpperCase() as Category;
      try {
        const course = await ctx.postgresClient.course.findUnique({
          where: { id: courseId },
        });
        const materials = await ctx.postgresClient.material.findMany({
          where: { courseId, category: cat },
        });
        return {
          course,
          materials,
        };
      } catch (e) {
        console.log(e);
      }
    }),
});

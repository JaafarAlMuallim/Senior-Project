import { z } from "zod";
import { postgresClient } from "../db";
import { publicProcedure, router } from "../trpc";
import { Category } from "@prisma/postgres/client";

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
  addMaterial: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        file: z.object({
          url: z.string(),
          type: z.string(),
          name: z.string(),
          size: z.number(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const { courseId, file } = input;
      const random = Math.random();
      const category =
        file.size > 1024
          ? Category.BOOK
          : random > 0.5
            ? Category.SLIDE
            : Category.HW;
      try {
        const material = await postgresClient.material.create({
          data: {
            courseId,
            name: file.name,
            size: file.size,
            url: file.url,
            fileType: file.type,
            category,
          },
        });
        return material;
      } catch (e) {
        console.log(e);
      }
    }),
  getMaterial: publicProcedure
    .input(z.object({ courseId: z.string(), category: z.nativeEnum(Category) }))
    .query(async ({ input }) => {
      const { courseId, category } = input;
      try {
        const materials = await postgresClient.material.findMany({
          where: { courseId, category },
        });
        console.log(materials);
        return materials;
      } catch (e) {
        console.log(e);
      }
    }),
});

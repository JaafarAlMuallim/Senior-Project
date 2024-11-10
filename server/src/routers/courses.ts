import { Category } from "@prisma/postgres/client";
import { z } from "zod";
import { postgresClient } from "../db";
import { publicProcedure, router } from "../trpc";

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
        userId: z.string(),
        file: z.object({
          url: z.string(),
          type: z.string(),
          name: z.string().nullable(),
          size: z.number().nullable(),
          category: z.nativeEnum(Category),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, file } = input;

      // Check if user is enrolled in the course
      const registrations = await postgresClient.registration.findMany({
        where: {
          userId,
        },
        include: {
          section: {
            include: {
              course: true,
            },
          },
        },
      });
      const now = new Date();
      let courseId = null;
      let name = "Other";

      for (const reg of registrations) {
        // Get today's date
        const regTime = new Date();
        // Set hours/minutes/seconds from the class time
        regTime.setHours(
          reg.section.startTime.getHours() - 3,
          reg.section.startTime.getMinutes(),
          reg.section.startTime.getSeconds(),
        );

        const timeDiff = Math.abs(now.getTime() - regTime.getTime());
        const hourDiff = timeDiff / (1000 * 60 * 60);

        if (hourDiff <= 1) {
          courseId = reg.section.course.id;
          name = reg.section.course.name;
          break;
        }
      }

      let category: Category = Category.OTHER;
      if (!category) {
        const random = Math.random();
        category = random < 0.5 ? Category.BOOK : Category.HW;
      }

      try {
        const material = await postgresClient.material.create({
          data: {
            courseId,
            name: name ?? "Untitled",
            size: file.size ?? 0,
            url: file.url,
            fileType: file.type,
            category: courseId ? file.category : category,
          },
        });
        return material;
      } catch (e) {
        console.log(e);
        return {
          courseId: null,
          error: "Failed to create material",
        };
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
        return materials;
      } catch (e) {
        console.log(e);
      }
    }),
});

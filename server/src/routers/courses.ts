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
        file: z.object({
          url: z.string(),
          type: z.string(),
          name: z.string().nullable(),
          size: z.number().nullable(),
          category: z.nativeEnum(Category),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { file } = input;

      const registrations = await ctx.postgresClient.registration.findMany({
        where: {
          userId: ctx.user?.id,
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
        const material = await ctx.postgresClient.material.create({
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
  getMaterial: authProcedure
    .input(z.object({ courseId: z.string(), category: z.nativeEnum(Category) }))
    .query(async ({ input, ctx }) => {
      const { courseId, category } = input;
      try {
        const materials = await ctx.postgresClient.material.findMany({
          where: { courseId, category },
        });
        return materials;
      } catch (e) {
        console.log(e);
      }
    }),
});

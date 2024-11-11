import { z } from "zod";
import { authProcedure, router } from "../trpc";

export const tutorRouter = router({
  addTutor: authProcedure
    .input(
      z.object({
        courseId: z.string(),
        grade: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { courseId, grade } = input;
      let tutor = await ctx.postgresClient.tutor.findFirst({
        where: {
          userId: ctx.user?.id,
        },
      });

      if (!tutor) {
        try {
          tutor = await ctx.postgresClient.tutor.create({
            data: {
              userId: ctx.user?.id!,
            },
          });
        } catch (error) {
          throw new Error("Tutor already exists");
        }
      }

      const courseTutor = await ctx.postgresClient.courseTutor.findFirst({
        where: {
          courseId,
          tutorId: tutor.id,
        },
      });

      if (courseTutor) {
        throw new Error("Tutor already exists");
      }

      const result = await ctx.postgresClient.courseTutor.create({
        data: {
          courseId,
          tutorId: tutor.id,
          grade,
        },
      });
      return result;
    }),

  getTutorsCourse: authProcedure.query(async ({ ctx }) => {
    const courseTutors = await ctx.postgresClient.courseTutor.findMany({
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
        course: true,
      },
    });
    return courseTutors;
  }),
  isTutor: authProcedure.query(async ({ ctx }) => {
    const tutor = await ctx.postgresClient.tutor.findFirst({
      where: {
        userId: ctx.user?.id,
      },
    });

    if (!tutor) {
      return false;
    }
    return tutor;
  }),
  getTutorsCourseById: authProcedure.query(async ({ ctx }) => {
    const tutorCourses = await ctx.postgresClient.courseTutor.findMany({
      where: {
        tutorId: ctx.user?.Tutor[0].id!,
      },
      include: {
        course: true,
      },
    });
    return tutorCourses;
  }),
});

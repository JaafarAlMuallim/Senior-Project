import { z } from "zod";
import { postgresClient } from "../db";
import { publicProcedure, router } from "../trpc";

export const tutorRouter = router({
  addTutor: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
        grade: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, courseId, grade } = input;
      let tutor = await postgresClient.tutor.findFirst({
        where: {
          userId,
        },
      });

      if (!tutor) {
        try {
          tutor = await postgresClient.tutor.create({
            data: {
              userId,
            },
          });
        } catch (error) {
          throw new Error("Tutor already exists");
        }
      }

      const courseTutor = await postgresClient.courseTutor.findFirst({
        where: {
          courseId,
          tutorId: tutor.id,
        },
      });

      if (courseTutor) {
        throw new Error("Tutor already exists");
      }

      const result = await postgresClient.courseTutor.create({
        data: {
          courseId,
          tutorId: tutor.id,
          grade,
        },
      });
      return result;
    }),

  getTutorsCourse: publicProcedure.query(async ({ input, ctx }) => {
    const courseTutors = await postgresClient.courseTutor.findMany({
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
  isTutor: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      const tutor = await postgresClient.tutor.findFirst({
        where: {
          userId,
        },
      });

      if (!tutor) {
        return false;
      }
      return tutor;
    }),
  getTutorsCourseById: publicProcedure
    .input(
      z.object({
        tutorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { tutorId } = input;
      const tutorCourses = await postgresClient.courseTutor.findMany({
        where: {
          tutorId,
        },
        include: {
          course: true,
        },
      });
      return tutorCourses;
    }),

  // removeTutor: publicProcedure
  //   .input(
  //     z.object({
  //       courseTutorId: z.string(),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     const { courseTutorId } = input;
  //     const result = await postgresClient.courseTutor.delete({
  //       where: {
  //         id: courseTutorId,
  //       },
  //     });
  //     return result;
  //   }),
});

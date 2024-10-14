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
        console.log("Creating tutor");
        try {
          tutor = await postgresClient.tutor.create({
            data: {
              userId,
            },
          });
        } catch (error) {
          console.log(error);
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
      console.log(result);
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

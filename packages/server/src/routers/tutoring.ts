import { z } from "zod";
import { db } from "../db";
import { publicProcedure } from "../trpc";

export const tutorRouter = {
  addTutor: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
        grade: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, courseId, grade } = input;
      let tutor = await db.tutor.findFirst({
        where: {
          userId,
        },
      });

      if (!tutor) {
        console.log("Creating tutor");
        try {
          tutor = await db.tutor.create({
            data: {
              userId,
            },
          });
        } catch (error) {
          console.log(error);
          throw new Error("Tutor already exists");
        }
      }

      const courseTutor = await db.courseTutor.findFirst({
        where: {
          courseId,
          tutorId: tutor.id,
        },
      });

      if (courseTutor) {
        throw new Error("Tutor already exists");
      }

      const result = await db.courseTutor.create({
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
    const courseTutors = await db.courseTutor.findMany({
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
  //     const result = await db.courseTutor.delete({
  //       where: {
  //         id: courseTutorId,
  //       },
  //     });
  //     return result;
  //   }),
};

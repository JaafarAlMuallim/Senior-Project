import { z } from "zod";
import { db } from "../db";
import { publicProcedure } from "../trpc";

export const tutorRouter = {
  addTutor: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        clerkId: z.string(),
        courseId: z.string(),
        grade: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { clerkId, courseId, grade } = input;
      const tutor = await db.tutor.findFirst({
        where: {
          id: clerkId,
        },
      });

      if (!tutor) {
        await db.tutor.create({
          data: {
            userId: clerkId,
          },
        });
      }
      const courseTutor = await db.courseTutor.findFirst({
        where: {
          courseId,
          tutorId: clerkId,
        },
      });
      if (courseTutor) {
        throw new Error("Tutor already exists");
      }

      const result = await db.courseTutor.create({
        data: {
          courseId,
          tutorId: clerkId,
          grade,
        },
      });
      return result;
    }),
  listTutors: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { courseId } = input;
      const tutors = await db.courseTutor.findMany({
        where: {
          courseId,
        },
      });
      return tutors;
    }),

  removeTutor: publicProcedure
    .input(
      z.object({
        courseTutorId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { courseTutorId } = input;
      const result = await db.courseTutor.delete({
        where: {
          id: courseTutorId,
        },
      });
      return result;
    }),
};

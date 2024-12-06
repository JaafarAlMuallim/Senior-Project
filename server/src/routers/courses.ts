import { Category } from "@prisma/postgres/client";
import { z } from "zod";
import { authProcedure, router } from "../trpc";

const preprocess = (rawString: string) => {
  // Step 1: Remove the markdown-like code block syntax
  let cleanedString = rawString.replace(/```json|```/g, "").trim();

  // Step 2: Replace invalid escape sequences and unnecessary symbols
  cleanedString = cleanedString.replace(/\\[^\ntrbfu"'\\]/g, ""); // Remove invalid escape sequences
  cleanedString = cleanedString.replace(/\\n/g, ""); // Remove literal newlines (\n)

  // Step 3: Parse the cleaned string into JSON
  try {
    const parsedQuestions = JSON.parse(cleanedString);

    // Define TypeScript type for validation
    type Question = {
      question: string;
      options: string[];
      answer: string;
    };

    // Validate and type-check
    const typedQuestions: Question[] = parsedQuestions;

    return typedQuestions;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
};

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

  createQuiz: authProcedure
    .input(
      z.object({
        courseId: z.string(),
        material: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { courseId } = input;
      try {
        const fetched = await fetch("http://localhost:8000/generate-mcq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: courseId }),
        });
        const raw = (await fetched.json()) as { questions: string };

        const questions = preprocess(raw.questions);
        const quiz = await ctx.postgresClient.quiz.create({
          data: {
            courseId,
          },
        });
        const allQuestions = questions.map((question) => {
          return {
            quizId: quiz.id,
            question: question.question,
            options: question.options,
            correctAnswer: question.answer,
          };
        });
        await ctx.postgresClient.question.createMany({
          data: allQuestions,
        });

        return quiz;
      } catch (e) {
        console.log(e);
        return {
          courseId: null,
          error: "Failed to create quiz",
        };
      }
    }),
  getQuizzes: authProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { courseId } = input;
      const quizzes = await ctx.postgresClient.quiz.findMany({
        where: { courseId },
      });
      return quizzes;
    }),
  getQuiz: authProcedure
    .input(
      z.object({
        quizId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { quizId } = input;
      const quiz = ctx.postgresClient.quiz.findUnique({
        where: { id: quizId },
        include: {
          Question: true,
        },
      });
      return quiz;
    }),
});

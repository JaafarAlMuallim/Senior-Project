import { z } from "zod";
import { authProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { authRouter } from "./auth";
import { courseRouter } from "./courses";
import { groupRouter } from "./groups";
import { messageRouter } from "./message";
import { profileRouter } from "./profile";
import { scheduleRouter } from "./schedule";
import { sessionRouter } from "./session";
import { tutorRouter } from "./tutoring";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  profiles: profileRouter,
  tutors: tutorRouter,
  courses: courseRouter,
  sessions: sessionRouter,
  schedule: scheduleRouter,
  groups: groupRouter,
  messages: messageRouter,

  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;

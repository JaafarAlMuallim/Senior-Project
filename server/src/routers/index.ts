import { router } from "../trpc";
import { authRouter } from "./auth";
import { courseRouter } from "./courses";
import { profileRouter } from "./profile";
import { scheduleRouter } from "./schedule";
import { sessionRouter } from "./session";
import { tutorRouter } from "./tutoring";

export const appRouter = router({
  auth: authRouter,
  profiles: profileRouter,
  tutors: tutorRouter,
  courses: courseRouter,
  sessions: sessionRouter,
  schedule: scheduleRouter,
});

export type AppRouter = typeof appRouter;

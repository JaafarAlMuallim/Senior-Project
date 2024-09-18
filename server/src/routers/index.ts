import { router } from "../trpc";
import { tutorRouter } from "./tutoring";
import { courseRouter } from "./courses";
import { profileRouter } from "./profile";
import { authRouter } from "./auth";

export const appRouter = router({
  signUp: authRouter.signUp,
  updateProfile: profileRouter.update,
  getProfile: profileRouter.get,
  addTutor: tutorRouter.addTutor,
  getCourses: courseRouter.getCourses,
});

export type AppRouter = typeof appRouter;

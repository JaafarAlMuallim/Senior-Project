import { router } from "../trpc";
import { tutorRouter } from "./tutoring";
import { courseRouter } from "./courses";
import { profileRouter } from "./profile";
import { authRouter } from "./auth";
import { sessionRouter } from "./session";
import { scheduleRouter } from "./schedule";

export const appRouter = router({
  signUp: authRouter.signUp,
  updateProfile: profileRouter.update,
  getProfile: profileRouter.get,
  addTutor: tutorRouter.addTutor,
  getTutors: tutorRouter.getTutorsCourse,
  getCourses: courseRouter.getCourses,
  createSession: sessionRouter.createSession,
  getSessions: sessionRouter.getSessions,
  getTutorSessions: sessionRouter.getTutorSessions,
  getCourseSessions: sessionRouter.getCourseSessions,
  getSchedule: scheduleRouter.getSchedule,
  getTerms: scheduleRouter.getSemesters,
});

export type AppRouter = typeof appRouter;

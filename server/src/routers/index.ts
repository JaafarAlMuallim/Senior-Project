import { z } from "zod";
import { signUp } from "../controllers/auth";
import {
  getProfile,
  profileSchema,
  updateOnboarding,
  updateProfile,
} from "../controllers/profile";
import { publicProcedure, router, trpc } from "../trpc";
import { tutorRouter } from "./tutoring";

const signUpProc = publicProcedure
  .input(
    z.object({
      email: z.string(),
      name: z.string(),
      clerkId: z.string(),
    })
  )
  .mutation(signUp);
const getProfileProc = publicProcedure
  .input(
    z.object({
      clerkId: z.string(),
    })
  )
  .query(getProfile);

const updateProfileProc = publicProcedure
  .input(
    z.object({
      clerkId: z.string(),
      data: profileSchema.partial(),
    })
  )
  .mutation(updateProfile);

const onboardingProc = publicProcedure
  .input(
    z.object({
      clerkId: z.string(),
      data: profileSchema.partial(),
    })
  )
  .mutation(updateOnboarding);

export const appRouter = router({
  signUpProc,
  getProfileProc,
  updateProfileProc,
  onboardingProc,
  addTutor: tutorRouter.addTutor,
});

export type AppRouter = typeof appRouter;

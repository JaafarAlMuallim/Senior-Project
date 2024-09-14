import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import {
  getProfile,
  updateOnboarding,
  updateProfile,
} from "./controllers/profile";
import { z } from "zod";
import { signUp } from "./controllers/auth";
import { profileSchema } from "./controllers/profile";

export const createContext =
  ({}: trpcExpress.CreateExpressContextOptions) => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create();

const signUpProc = trpc.procedure
  .input(
    z.object({
      email: z.string(),
      name: z.string(),
      clerkId: z.string(),
    })
  )
  .mutation(signUp);
const getProfileProc = trpc.procedure
  .input(
    z.object({
      clerkId: z.string(),
    })
  )
  .query(getProfile);

const updateProfileProc = trpc.procedure
  .input(
    z.object({
      clerkId: z.string(),
      data: profileSchema.partial(),
    })
  )
  .mutation(updateProfile);

const onboardingProc = trpc.procedure
  .input(
    z.object({
      clerkId: z.string(),
      data: profileSchema.partial(),
    })
  )
  .mutation(updateOnboarding);

export const appRouter = trpc.router({
  signUpProc,
  getProfileProc,
  updateProfileProc,
  onboardingProc,
});

export type AppRouter = typeof appRouter;

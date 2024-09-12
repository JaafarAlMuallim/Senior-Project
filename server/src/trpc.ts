import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { signUp } from "./controllers/auth";
import { updateProfile } from "./controllers/profile";

export const createContext =
  ({}: trpcExpress.CreateExpressContextOptions) => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create();

export const appRouter = trpc.router({
  signUp,
  updateProfile,
});

export type AppRouter = typeof appRouter;

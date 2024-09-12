import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "./db";

export const createContext =
  ({}: trpcExpress.CreateExpressContextOptions) => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;

const trpc = initTRPC.context<Context>().create();

const getUsers = trpc.procedure.query(async () => {
  try {
    const res = await db.user.findMany();
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const appRouter = trpc.router({
  getUsers,
});

export type AppRouter = typeof appRouter;

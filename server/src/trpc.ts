import type { User } from "@prisma/postgres/client";
import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { clerkMiddleware } from "@clerk/express";
import { mongoClient, postgresClient, redisClient } from "./db";

export const createContext = async (opts: CreateExpressContextOptions) => {
  const auth = clerkMiddleware();
  console.log(auth);
  return {
    auth,
    mongoClient,
    postgresClient,
    redisClient,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create();

export const publicProcedure = trpc.procedure;

export const router = trpc.router;

export const authProcedure = trpc.procedure.use(({ ctx, next }) => {
  // if (!(ctx as any).user) {
  //   throw new Error("Unauthorized");
  // }
  // TODO: Uncomment the above code and replace the below code with the actual implementation
  // const user = db.user.findFirst({ id: ctx.req.userId });
  console.log(ctx);
  const user = {} as User;
  return next({ ctx: { ...ctx, user } });
});

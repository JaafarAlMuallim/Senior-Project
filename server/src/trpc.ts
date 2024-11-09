// import type { User } from "@prisma/postgres/client";
import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { mongoClient, postgresClient, redisClient } from "./db";
// import { createClerkClient } from "@clerk/backend";

export const createContext = async (opts: CreateExpressContextOptions) => {
  // const clerkClient = createClerkClient({
  //   secretKey: process.env.CLERK_SECRET_KEY,
  // });
  const user = await getSession(opts.req.headers.authorization!);
  return {
    user,
    mongoClient,
    postgresClient,
    redisClient,
  };
};

const getSession = async (userId: string) => {
  if (!userId) {
    return null;
  }
  const user = await postgresClient.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  return user;
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create();

export const publicProcedure = trpc.procedure;

export const router = trpc.router;

export const authProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error("Unauthorized");
  }
  // const user = {} as User;
  return next({ ctx });
});

import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { mongoClient, postgresClient, redisClient } from "./db";
import jwt from "jsonwebtoken";

export const createContext = async (opts?: CreateExpressContextOptions) => {
  const token = opts?.req.headers.authorization?.split(" ")[1];
  const user = await getSession(token!);
  return {
    req: opts?.req,
    user,
    mongoClient,
    postgresClient,
    redisClient,
  };
};

export const getSession = async (token: string | undefined) => {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET!
    ) as jwt.JwtPayload;
    const user = await postgresClient.user.findUnique({
      where: {
        clerkId: decoded.userId,
      },
      include: {
        Admin: true,
        Tutor: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create();

export const publicProcedure = trpc.procedure;

export const router = trpc.router;
export const createTRPCRouter = trpc.router;
export const createCallerFactory = trpc.createCallerFactory;

export const authProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    console.log("HERE HERE HERE");
    throw new Error("Unauthorized");
  }
  console.log(ctx.user);
  return next({ ctx });
});

export const adminProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.user.Admin) {
    throw new Error("Unauthorized");
  }
  return next({ ctx });
});

export const tutorProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.user.Tutor) {
    throw new Error("Unauthorized");
  }
  return next({ ctx });
});

export const subscriptionAuthProcedure = trpc.procedure.use(
  async ({ ctx, next }) => {
    if (!ctx.user) {
      // Attempt to fetch the user asynchronously before the subscription starts
      const token = ctx.req?.headers.authorization?.split(" ")[1];
      ctx.user = await getSession(token);
    }

    if (!ctx.user) {
      throw new Error("Unauthorized");
    }

    return next({ ctx });
  }
);

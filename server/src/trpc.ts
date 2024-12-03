import { initTRPC } from "@trpc/server";
import { mongoClient, postgresClient, redisClient } from "./db";
import jwt from "jsonwebtoken";

type ContextRequest = {
  headers: {
    authorization?: string;
    [key: string]: string | string[] | undefined;
  };
  [key: string]: any;
};

// Updated context options type
type ContextOptions = {
  req: ContextRequest;
};

export const createContext = async (opts?: ContextOptions) => {
  console.log("HEADERS: ", opts?.req.headers);
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
      const token = ctx.req?.headers.authorization?.split(" ")[1];
      ctx.user = await getSession(token);
    }

    if (!ctx.user) {
      throw new Error("Unauthorized");
    }

    return next({ ctx });
  }
);

import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { mongoClient, postgresClient, redisClient } from "./db";
import jwt from "jsonwebtoken";
import fs from "fs";

export const createContext = async (opts: CreateExpressContextOptions) => {
  const token = opts.req.headers.authorization?.split(" ")[1];
  // create new file and save the token
  const file = fs.createWriteStream("token.txt");
  file.write(token!);
  const user = await getSession(token!);
  return {
    user,
    mongoClient,
    postgresClient,
    redisClient,
  };
};

const getSession = async (token: string | null) => {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET!,
    ) as jwt.JwtPayload;
    console.log(decoded);
    const user = await postgresClient.user.findUnique({
      where: {
        clerkId: decoded.userId,
      },
    });
    console.log(user);
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

export const authProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  console.log(ctx.user);
  if (!ctx.user) {
    throw new Error("Unauthorized");
  }
  // const user = {} as User;
  return next({ ctx });
});

import type { User } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext =
  ({}: trpcExpress.CreateExpressContextOptions) => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create();

export const publicProcedure = trpc.procedure;

export const authProcedure = trpc.procedure.use(({ ctx, next }) => {
  // if (!(ctx as any).user) {
  //   throw new Error("Unauthorized");
  // }
  // TODO: Uncomment the above code and replace the below code with the actual implementation
  // const user = db.user.findFirst({ id: ctx.req.userId });
  const user = {} as User;
  return next({ ctx: { ...ctx, user } });
});

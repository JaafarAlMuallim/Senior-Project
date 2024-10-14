import { z } from "zod";
import { postgresClient, redisClient } from "../db";
import { publicProcedure, router } from "../trpc";
import EventEmitter, { on } from "events";
import { Message, User } from "@prisma/mongo/client";

export type WhoIsTyping = Record<string, { lastTyped: Date }>;

export interface MyEvents {
  add: (groupId: string, data: Message & { user: User }) => void;
  isTypingUpdate: (groupId: string, who: WhoIsTyping) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

class MyEventEmitter extends EventEmitter {
  public toIterable<TEv extends keyof MyEvents>(
    event: TEv,
    opts: NonNullable<Parameters<typeof on>[2]>,
  ): AsyncIterable<Parameters<MyEvents[TEv]>> {
    return on(this, event, opts) as AsyncIterable<Parameters<MyEvents[TEv]>>;
  }
}

// TODO: REDIS
// In a real app, you'd probably use Redis or something
export const ee = new MyEventEmitter();

// who is currently typing for each group, key is `name`
export const currentlyTyping: Record<string, WhoIsTyping> = Object.create(null);

// every 1s, clear old "isTyping"
// setInterval(() => {
//   const updatedGroups = new Set<string>();
//   const now = Date.now();
//   for (const [groupId, typers] of Object.entries(currentlyTyping)) {
//     for (const [key, value] of Object.entries(typers ?? {})) {
//       if (now - value.lastTyped.getTime() > 3e3) {
//         delete typers[key];
//         updatedGroups.add(groupId);
//       }
//     }
//   }
//   updatedGroups.forEach((groupId) => {
//     ee.emit("isTypingUpdate", groupId, currentlyTyping[groupId] ?? {});
//   });
// }, 3e3).unref();

setInterval(() => {
  const updatedGroups = new Set<string>();
  const now = Date.now();

  for (const [groupId, typers] of Object.entries(currentlyTyping)) {
    for (const [key, value] of Object.entries(typers ?? {})) {
      // Check if more than 3 seconds have passed since the last typing event
      if (now - value.lastTyped.getTime() > 1.5e3) {
        // 3 seconds timeout
        delete typers[key]; // Remove from typing list
        updatedGroups.add(groupId);
      }
    }
  }

  // Emit typing update event for any group with updated typing status
  updatedGroups.forEach((groupId) => {
    ee.emit("isTypingUpdate", groupId, currentlyTyping[groupId] ?? {});
  });
}, 1e3).unref(); // Check every second, but only clear if 3 seconds have passed

export const groupRouter = router({
  list: publicProcedure.query(async () => {
    return await postgresClient.group.findMany();
    // return postgresClient.query.Group.findMany();
  }),

  isTyping: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        typing: z.boolean(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: get name from ctx
      // const { name } = opts.ctx.user;
      const { userId, groupId, typing } = input;
      const user = await postgresClient.user.findUnique({
        where: {
          id: userId,
        },
      });
      const name = user?.name;

      if (!currentlyTyping[groupId]) {
        currentlyTyping[groupId] = {};
      }

      console.log("isTyping", name, typing);

      if (typing) {
        currentlyTyping[groupId][name!] = {
          lastTyped: new Date(),
        };
      } else {
        delete currentlyTyping[groupId][name!];
      }

      ee.emit("isTypingUpdate", groupId, currentlyTyping[groupId]);
    }),

  whoIsTyping: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .subscription(async function* ({ input, signal }) {
      const { groupId: currGroup } = input;

      let lastIsTyping = "";

      /**
       * yield who is typing if it has changed
       * won't yield if it's the same as last time
       */
      try {
        function* maybeYield(who: WhoIsTyping) {
          const idx = Object.keys(who).toSorted().toString();
          if (idx === lastIsTyping) {
            return;
          }
          yield Object.keys(who);
          lastIsTyping = idx;
        }

        // emit who is currently typing
        yield* maybeYield(currentlyTyping[currGroup] ?? {});

        for await (const [groupId, who] of ee.toIterable("isTypingUpdate", {
          signal: signal,
        })) {
          if (groupId === currGroup) {
            yield* maybeYield(who);
          }
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error getting who is typing");
      }
    }),
  getUserGroups: publicProcedure // TODO: Change to authProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      try {
        try {
          const groups = await postgresClient.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              Groups: true,
            },
          });
          if (!groups) {
            throw new Error("User not found");
          }
          return groups.Groups;
        } catch (error) {
          console.log(error);
          throw new Error("Error getting user groups");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error getting user groups");
      }
    }),
  getGroup: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { groupId } = input;
      try {
        const group = await postgresClient.group.findUnique({
          where: {
            id: groupId,
          },
        });
        return group;
      } catch (error) {
        console.log(error);
        throw new Error("Error getting group");
      }
    }),
  sub: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { groupId, userId } = input;
      console.log("sub", groupId, userId);
      await Promise.all([
        await redisClient.sadd(`group:${groupId}:subscriptions`, userId),
        await redisClient.hset(
          `group:${groupId}:userId:${userId}`,
          "unread",
          "0",
        ),
      ]);

      // await redisClient.sadd(`group:${groupId}:subscriptions`, userId);
    }),
  unsub: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { groupId, userId } = input;
      console.log("unsub", groupId, userId);
      await redisClient.srem(`group:${groupId}:subscriptions`, userId);
    }),
});

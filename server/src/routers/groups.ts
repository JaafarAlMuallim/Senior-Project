import { z } from "zod";
import { authProcedure, router } from "../trpc";
import EventEmitter, { on } from "events";
import { Message, User } from "@prisma/mongo/client";
import { mongoClient } from "../db";

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
    opts: NonNullable<Parameters<typeof on>[2]>
  ): AsyncIterable<Parameters<MyEvents[TEv]>> {
    return on(this, event, opts) as AsyncIterable<Parameters<MyEvents[TEv]>>;
  }
}

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
  list: authProcedure.query(async ({ ctx }) => {
    return await ctx.postgresClient.group.findMany();
  }),
  isTyping: authProcedure
    .input(
      z.object({
        groupId: z.string(),
        typing: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, typing } = input;
      const name = ctx.user?.name;

      if (!currentlyTyping[groupId]) {
        currentlyTyping[groupId] = {};
      }

      if (typing) {
        currentlyTyping[groupId][name!] = {
          lastTyped: new Date(),
        };
      } else {
        delete currentlyTyping[groupId][name!];
      }

      ee.emit("isTypingUpdate", groupId, currentlyTyping[groupId]);
    }),
  whoIsTyping: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .subscription(async function* ({ input, signal }) {
      try {
        const { groupId: currGroup } = input;
        console.log("CURR GROUP", currGroup);

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
          console.log(currentlyTyping[currGroup]);

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
      } catch (error) {
        console.log(error);
        throw new Error("Error getting who is typing");
      }
    }),
  getUserGroups: authProcedure.query(async ({ ctx }) => {
    try {
      try {
        const groups = await mongoClient.userGroups.findMany({
          where: {
            userId: ctx.user?.id,
          },
          include: {
            group: true,
          },
        });

        if (!groups) {
          throw new Error("User not found");
        }
        console.log("GROUPS", groups);
        return groups;
      } catch (error) {
        console.log(error);
        throw new Error("Error getting user groups");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user groups");
    }
  }),
  changeMute: authProcedure
    .input(
      z.object({
        groupId: z.string(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, status } = input;
      try {
        const changeMute = await ctx.mongoClient.userGroups.update({
          where: {
            id: groupId,
          },
          data: {
            isMuted: status,
          },
        });
        return changeMute;
      } catch (error) {
        console.log(error);
        throw new Error("Error changing mute status");
      }
    }),
  getGroup: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { groupId } = input;
      try {
        const group = await ctx.mongoClient.group.findUnique({
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
  sub: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId } = input;
      console.log("sub", groupId);
      await Promise.all([
        await ctx.redisClient.sadd(
          `group:${groupId}:subscriptions`,
          ctx.user?.id!
        ),
        await ctx.redisClient.hset(
          `group:${groupId}:userId:${ctx.user?.id}`,
          "unread",
          "0"
        ),
      ]);

      // await redisClient.sadd(`group:${groupId}:subscriptions`, userId);
    }),
  unsub: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId } = input;
      await ctx.redisClient.srem(
        `group:${groupId}:subscriptions`,
        ctx.user?.id!
      );
    }),
});

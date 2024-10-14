import { tracked } from "@trpc/server";
import { streamToAsyncIterable } from "../lib/streamToAsync";
import { Message, User } from "@prisma/mongo/client";
import { z } from "zod";
import { mongoClient, postgresClient, redisClient } from "../db";
import { publicProcedure, router } from "../trpc";
import type { MyEvents } from "./groups";
import { currentlyTyping, ee } from "./groups";
import { model } from "../ai";

export const messageRouter = router({
  add: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
        text: z.string().trim().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, text, userId } = input;
      const currentSubscriptions = await redisClient.smembers(
        `group:${groupId}:subscriptions`,
      );

      const notSubscribed = await postgresClient.user.findMany({
        where: {
          id: {
            notIn: currentSubscriptions,
          },
        },
      });

      const message = await mongoClient.message.create({
        data: {
          // name: opts.ctx.user.name,
          userId,
          text,
          groupId,
        },
        include: {
          user: true,
        },
      });

      const groupTyping = currentlyTyping[groupId];
      if (groupTyping) {
        ee.emit("isTypingUpdate", groupId, groupTyping);
      }

      const defMessage = message!;
      ee.emit("add", groupId, defMessage);

      // increment their unread count
      Promise.all(
        notSubscribed.map(async (user) => {
          await redisClient.hincrby(
            `group:${groupId}:userId:${user.id}`,
            "unread",
            1,
          );
        }),
      );

      return message;
    }),
  addAIMessage: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
        text: z.string().trim().min(1),
        agent: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, agent, text, userId } = input;
      console.log("addAIMessage", groupId, agent, text, userId);
      let ai = null;
      try {
        console.log("get Agent");
        ai = await mongoClient.user.findFirst({
          where: {
            name: agent,
          },
        });
      } catch (err) {
        console.error("Error getting agent");
        console.error(err);
      }

      try {
        console.log("Creating message");
        await mongoClient.message.create({
          data: {
            // name: opts.ctx.user.name,
            userId,
            text,
            groupId,
          },
        });
      } catch (err) {
        console.error("Error creating message");
        console.error(err);
      }

      // get Response
      try {
        console.log("Creating response");
        const res = await model.generateContent(text);
        const response = await mongoClient.message.create({
          data: {
            // name: opts.ctx.user.name,
            userId: ai?.userId!,
            text: res.response.text(),
            groupId,
          },
        });

        return response;
      } catch (err) {
        console.error("Error creating response");
        console.error(err);
      }
    }),
  getAIMessage: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { groupId, userId } = input;
      const message = await mongoClient.message.findFirst({
        where: {
          groupId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  infinite: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        cursor: z.date().nullish(),
        take: z.number().min(1).max(50).nullish(),
      }),
    )
    .query(async ({ input }) => {
      // add user to subscription list if they are not already
      // opts.ctx.user.id,
      const { cursor, groupId } = input;
      let { take } = input;
      if (!take) {
        take = 20;
      }
      console.log("infinite", groupId, cursor, take);

      const page = await mongoClient.message.findMany({
        where: {
          groupId,
          createdAt: {
            lte: cursor ?? new Date(),
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: take + 1,
      });

      const items = page;
      let nextCursor: typeof cursor | null = null;
      if (items.length > take) {
        const prev = items.shift();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nextCursor = prev!.createdAt;
      }
      return {
        items,
        nextCursor,
      };
    }),

  onAdd: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        // lastEventId is the last event id that the client has received
        // On the first call, it will be whatever was passed in the initial setup
        // If the client reconnects, it will be the last event id that the client received
        lastEventId: z.string().nullish(),
      }),
    )
    .subscription(async function* ({ input, signal }) {
      let lastMessageCursor: Date | null = null;
      const { lastEventId: eventId, groupId: currGroup } = input;
      console.log("onAdd", eventId, currGroup);
      if (eventId) {
        const itemById = await mongoClient.message.findFirst({
          where: {
            id: eventId,
          },
          include: {
            user: true,
          },
        });
        // const itemById = await db.query.Message.findFirst({
        //   where: (fields, ops) => ops.eq(fields.id, eventId),
        // });
        lastMessageCursor = itemById?.createdAt ?? null;
      }

      let unsubscribe = () => {
        //
      };

      // We use a readable stream here to prevent the client from missing events
      // created between the fetching & yield'ing of `newItemsSinceCursor` and the
      // subscription to the ee
      const stream = new ReadableStream<Message & { user: User }>({
        async start(controller) {
          const onAdd: MyEvents["add"] = (groupId, data) => {
            if (groupId === currGroup) {
              controller.enqueue(data);
            }
          };
          ee.on("add", onAdd);
          unsubscribe = () => {
            ee.off("add", onAdd);
          };

          const newItemsSinceCursor = await mongoClient.message.findMany({
            where: {
              groupId: currGroup,
              createdAt: {
                gt: lastMessageCursor!,
              },
            },
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          });

          for (const item of newItemsSinceCursor) {
            controller.enqueue(item);
          }
        },
        cancel() {
          unsubscribe();
        },
      });

      for await (const message of streamToAsyncIterable(stream, {
        signal: signal,
      })) {
        // tracking the message id ensures the client can reconnect at any time and get the latest events this id
        yield tracked(message.id, message);
      }
    }),
  getLastMessage: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { groupId } = input;
      const message = await mongoClient.message.findFirst({
        where: {
          groupId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return message;
    }),

  getUnreadCount: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { groupId, userId } = input;
      const count = await redisClient.hget(
        `group:${groupId}:userId:${userId}`,
        "unread",
      );
      return parseInt(count ?? "0");
    }),
  getMessages: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { groupId } = input;
      console.log("get messages", groupId);
      try {
        const messages = await mongoClient.message.findMany({
          where: {
            groupId,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return messages;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
});

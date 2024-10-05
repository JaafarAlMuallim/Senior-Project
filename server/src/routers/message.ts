import { tracked } from "@trpc/server";
import { streamToAsyncIterable } from "../lib/streamToAsync";
import { Message } from "@prisma/client";
import { z } from "zod";
import { db } from "../db";
import { publicProcedure, router } from "../trpc";
import type { MyEvents } from "./groups";
import { currentlyTyping, ee } from "./groups";

export const messageRouter = router({
  add: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        groupId: z.string(),
        userId: z.string(),
        content: z.string().trim().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, content, userId } = input;
      const message = await db.message.create({
        data: {
          content,
          // name: opts.ctx.user.name,
          senderId: userId,
          groupId,
        },
        include: {
          sender: true,
        },
      });

      const groupTyping = currentlyTyping[groupId];
      if (groupTyping) {
        delete groupTyping[message.sender!.name];
        ee.emit("isTypingUpdate", groupId, groupTyping);
      }

      const defMessage = message!;
      ee.emit("add", groupId, defMessage);

      return message;
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
      const { cursor, groupId } = input;
      let { take } = input;
      if (!take) {
        take = 20;
      }

      // const page = await db.query.Message.findMany({
      //   orderBy: (fields, ops) => ops.desc(fields.createdAt),
      //   where: (fields, ops) =>
      //     ops.and(
      //       ops.eq(fields.groupId, opts.input.groupId),
      //       cursor ? ops.lte(fields.createdAt, cursor) : undefined,
      //     ),
      //   limit: take + 1,
      // });
      const page = await db.message.findMany({
        where: {
          groupId,
          createdAt: {
            lte: cursor ?? new Date(),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: take + 1,
      });

      const items = page.reverse();
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
      if (eventId) {
        const itemById = await db.message.findFirst({
          where: {
            id: eventId,
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
      const stream = new ReadableStream<Message>({
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

          // const newItemsSinceCursor = await db.query.Message.findMany({
          //   where: (fields, ops) =>
          //     ops.and(
          //       ops.eq(fields.groupId, opts.input.groupId),
          //       lastMessageCursor
          //         ? ops.gt(fields.createdAt, lastMessageCursor)
          //         : undefined,
          //     ),
          //   orderBy: (fields, ops) => ops.asc(fields.createdAt),
          // });
          const newItemsSinceCursor = await db.message.findMany({
            where: {
              groupId: currGroup,
              createdAt: {
                gt: lastMessageCursor!,
              },
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
      const message = await db.message.findFirst({
        where: {
          groupId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return message;
    }),
});

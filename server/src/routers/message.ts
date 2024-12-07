import { tracked } from "@trpc/server";
import { streamToAsyncIterable } from "../lib/streamToAsync";
import { Message, User } from "@prisma/mongo/client";
import { z } from "zod";
import { authProcedure, router, subscriptionAuthProcedure } from "../trpc";
import type { MyEvents } from "./groups";
import { currentlyTyping, ee } from "./groups";

export const messageRouter = router({
  add: authProcedure
    .input(
      z.object({
        groupId: z.string(),
        text: z.string().trim().min(0),
        attachment_url: z.any().optional(),
        attachment_type: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, text, attachment_url, attachment_type } = input;
      const currentSubscriptions = await ctx.redisClient.smembers(
        `group:${groupId}:subscriptions`
      );

      const notSubscribed = await ctx.postgresClient.user.findMany({
        where: {
          id: {
            notIn: currentSubscriptions,
          },
        },
      });

      const message = await ctx.mongoClient.message.create({
        data: {
          // name: opts.ctx.user.name,
          userId: ctx.user?.id!,
          text,
          groupId,
          attachment_url: attachment_url || null,
          attachment_type: attachment_type || null,
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
          await ctx.redisClient.hincrby(
            `group:${groupId}:userId:${user.id}`,
            "unread",
            1
          );
        })
      );

      return message;
    }),
  addUserMessage: authProcedure
    .input(
      z.object({
        groupId: z.string(),
        text: z.string().trim().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, text } = input;
      await ctx.mongoClient.message.create({
        data: {
          userId: ctx.user?.id!,
          text,
          groupId,
        },
      });
    }),
  addAIMessage: authProcedure
    .input(
      z.object({
        groupId: z.string(),
        text: z.string().trim().min(1),
        agent: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { groupId, agent, text } = input;
      let ai = null;
      console.log(agent, groupId);
      let context: Array<{
        role: "user" | "assistant";
        content: string;
      }> = [];
      try {
        ai = await ctx.mongoClient.user.findFirst({
          where: {
            name: agent,
          },
        });
      } catch (err) {
        console.error("Error getting agent");
        console.error(err);
      }

      try {
        const oldMessages = await ctx.mongoClient.message.findMany({
          where: {
            groupId,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
          take: 10,
        });

        oldMessages.reverse().map((msg) => {
          context.push({
            role: msg.user.email.includes("EduLink") ? "assistant" : "user",
            content: msg.text.replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
          });
        });
      } catch (err) {
        console.error(err);
      }
      // get Response
      try {
        console.log(
          JSON.stringify({
            text,
            chat_history: context,
          })
        );
        // const res = await chat.sendMessage(text);
        const res = await fetch("http://localhost:8000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            chat_history: context,
          }),
        });
        if (res.ok) {
          const answer = (await res.json()) as { answer: string };

          const response = await ctx.mongoClient.message.create({
            data: {
              userId: ai?.userId!,
              text: answer.answer || "No Response",
              groupId,
            },
          });
          return response;
        } else {
          console.error("Error getting response");
          return null;
        }
      } catch (err) {
        console.error(err);
      }
    }),
  infinite: authProcedure
    .input(
      z.object({
        groupId: z.string(),
        cursor: z.date().nullish(),
        take: z.number().min(1).max(50).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, groupId } = input;
      let { take } = input;
      if (!take) {
        take = 20;
      }
      const page = await ctx.mongoClient.message.findMany({
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
          createdAt: "asc",
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

  onAdd: subscriptionAuthProcedure
    .input(
      z.object({
        groupId: z.string(),
        lastEventId: z.string().nullish(),
      })
    )
    .subscription(async function* ({ input, signal, ctx }) {
      try {
        let lastMessageCursor: Date | null = null;
        const { lastEventId: eventId, groupId: currGroup } = input;
        if (eventId) {
          const itemById = await ctx.mongoClient.message.findFirst({
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

        // remove redis unread count
        await ctx.redisClient.hset(
          `group:${currGroup}:userId:${ctx.user?.id!}`,
          "unread",
          0
        );

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

            const newItemsSinceCursor = await ctx.mongoClient.message.findMany({
              where: {
                groupId: currGroup,
                createdAt: {
                  gt: lastMessageCursor || new Date(0),
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
      } catch (error) {
        console.log(error);
        throw new Error("Error getting messages");
      }
    }),
  getLastMessage: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { groupId } = input;
      const message = await ctx.mongoClient.message.findFirst({
        where: {
          groupId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return message;
    }),

  getUnreadCount: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { groupId } = input;
      const count = await ctx.redisClient.hget(
        `group:${groupId}:userId:${ctx.user?.id!}`,
        "unread"
      );
      return parseInt(count ?? "0");
    }),
  getMessages: authProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { groupId } = input;
      try {
        const messages = await ctx.mongoClient.message.findMany({
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

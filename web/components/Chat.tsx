"use client";
import {
  Image as ImageIcon,
  Mic,
  MessageSquare,
  Paperclip,
  Send,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { cx } from "class-variance-authority";
import { format, formatDistanceToNow, isToday } from "date-fns";
import * as React from "react";
import { listWithAnd, pluralize, run } from "@/lib/utils";
import { useLiveMessages, useThrottledIsTypingMutation } from "@/hooks/useChat";
import { Button } from "./ui/button";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SubscriptionStatus(props: {
  subscription: ReturnType<typeof useLiveMessages>["subscription"];
}) {
  const { subscription } = props;
  return (
    <div
      className={cx(
        "rounded-full p-2 text-sm transition-colors",
        run(() => {
          switch (subscription.status) {
            case "idle":
            case "connecting":
              return "bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400";
            case "error":
              return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "pending":
              return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
          }
        }),
      )}
    >
      {run(() => {
        switch (subscription.status) {
          case "idle":
          case "connecting":
            // treat idle and connecting the same

            return (
              <div>
                Connecting...
                {subscription.error && " (There are connection problems)"}
              </div>
            );
          case "error":
            // something went wrong
            return (
              <div>
                Error - <em>{subscription.error.message}</em>
                <a
                  href="#"
                  onClick={() => {
                    subscription.reset();
                  }}
                  className="hover underline"
                >
                  Try Again
                </a>
              </div>
            );
          case "pending":
            // we are polling for new messages
            return <div>Connected - awaiting messages</div>;
        }
      })}
    </div>
  );
}

export function Chat({ groupId }: { groupId: string }) {
  const liveMessages = useLiveMessages(groupId);
  const currentlyTyping = trpc.groups.whoIsTyping.useSubscription({
    groupId,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: currentUser } = trpc.auth.currentUser.useQuery();
  const user = useUser();

  return (
    <main className="flex-1 overflow-hidden">
      <div className="flex h-full flex-col">
        {/* connection status indicator */}
        <div className="relative flex items-center justify-center gap-2 p-4 sm:p-6 lg:p-8">
          {/* connection status indicator - centered */}
          <div className="absolute right-0 top-0 flex items-center justify-center gap-2 rounded-full p-2 text-sm">
            <SubscriptionStatus subscription={liveMessages.subscription} />
          </div>
        </div>
        <div
          className="flex flex-1 flex-col-reverse overflow-y-scroll p-4 sm:p-6 lg:p-8"
          ref={scrollRef}
        >
          {/* Inside this div things will not be reversed. */}
          <div>
            <div className="grid gap-4">
              <div>
                <Button
                  disabled={
                    !liveMessages.query.hasNextPage ||
                    liveMessages.query.isFetchingNextPage
                  }
                  onClick={() => {
                    void liveMessages.query.fetchNextPage();
                  }}
                >
                  {liveMessages.query.isFetchingNextPage
                    ? "Loading..."
                    : !liveMessages.query.hasNextPage
                      ? "Fetched everything!"
                      : "Load more"}
                </Button>
              </div>

              {liveMessages.messages?.map((msg) => {
                const isMe = msg.userId === currentUser?.id;

                return (
                  <div
                    key={msg.id}
                    className={cx(
                      "flex items-start gap-3",
                      isMe ? "justify-end" : "justify-start",
                    )}
                  >
                    <Avatar>
                      <AvatarImage src={user.user?.imageUrl} />
                      <AvatarFallback className="bg-violet-700 text-white">
                        {user.user?.firstName?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1">
                      <div
                        className={cx(
                          "rounded-lg bg-gray-100 p-3 text-sm",
                          isMe
                            ? "bg-gray-300 dark:bg-gray-800"
                            : "bg-gray-200 dark:bg-gray-700",
                        )}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <a
                          href={`/profile/${msg.user.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {msg.user.name}
                        </a>{" "}
                        ·{" "}
                        {isToday(msg.createdAt)
                          ? formatDistanceToNow(msg.createdAt) + " ago"
                          : format(msg.createdAt, "MMM d, yyyy h:mm a")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-sm italic text-gray-400">
              {currentlyTyping.data?.length ? (
                `${listWithAnd(currentlyTyping.data)} ${pluralize(
                  currentlyTyping.data.length,
                  "is",
                  "are",
                )} typing...`
              ) : (
                <>&nbsp;</>
              )}
            </p>
          </div>
        </div>

        <div className="border-t bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
          <AddMessageForm
            groupId={groupId}
            onMessagePost={() => {
              scrollRef.current?.scroll({
                // `top: 0` is actually the bottom of the chat due to `flex-col-reverse`
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </div>
      </div>
    </main>
  );
}

const formSchema = z.object({
  text: z.string(),
});

function AddMessageForm({
  groupId,
  onMessagePost,
}: {
  onMessagePost: () => void;
  groupId: string;
}) {
  const addMsg = trpc.messages.add.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const [isFocused, setIsFocused] = useState(false);

  function postMessage() {
    const input = {
      text: form.getValues().text,
      groupId,
    };
    addMsg.mutate(input, {
      onSuccess() {
        onMessagePost();
      },
      onError(error) {
        alert(error.message);
      },
    });
  }

  const isTypingMutation = useThrottledIsTypingMutation(groupId);

  const msg = form.watch("text");
  useEffect(() => {
    // update isTyping state
    isTypingMutation(isFocused && msg.trim().length > 0);
  }, [isFocused, msg, isTypingMutation]);
  const onSubmit = async () => {
    postMessage();
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <>
                <FormControl>
                  <Textarea
                    className="pr-12"
                    placeholder="Type your message..."
                    value={field.value}
                    onChange={field.onChange}
                    rows={field.value.split(/\r|\n/).length}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          <Button
            className="absolute right-2 top-2"
            size="icon"
            type="submit"
            variant="ghost"
          >
            <Send className="size-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

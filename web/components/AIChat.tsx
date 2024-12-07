"use client";
import { cx } from "class-variance-authority";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AddAIMessageForm from "./AIChatMessageForm";
import { useSearchParams } from "next/navigation";
const AIChat = ({ groupId }: { groupId: string }) => {
  const { data: messages } = trpc.messages.getMessages.useQuery({
    groupId,
  });
  const searchParams = useSearchParams();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: currentUser } = trpc.auth.currentUser.useQuery();
  const { user } = useUser();

  const isNewMessageInView = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      return scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold
    }
    return false;
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isNewMessageInView()) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [groupId]);

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <div className="relative flex items-center justify-center gap-2 p-4 sm:p-6 lg:p-8"></div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" ref={scrollRef}>
        <div className="grid gap-4">
          {[...(messages || [])].reverse().map((item) => {
            const isMe = item.user.name === currentUser?.name;

            return (
              <div
                key={item.id}
                className={cx(
                  "flex items-start gap-3 justify-start",
                  isMe && "flex-row-reverse",
                )}
              >
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-violet-700 text-white text-7xl">
                    JA
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
                    <p>{item.text}</p>
                  </div>
                  <div
                    className={cn(
                      "text-xs text-gray-500 dark:text-gray-400",
                      isMe && "text-right",
                    )}
                  >
                    {isToday(item.createdAt)
                      ? formatDistanceToNow(item.createdAt) + " ago"
                      : format(item.createdAt, "MMM d, yyyy h:mm a")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sticky bottom-0 border-t bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
        {!!searchParams.get("agent") ? (
          <AddAIMessageForm
            agent={searchParams.get("agent")!}
            groupId={groupId}
            onMessagePost={() => {
              scrollRef.current?.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
              });
            }}
          />
        ) : (
          <div>Agent not found</div>
        )}
      </div>
    </section>
  );
};
export default AIChat;

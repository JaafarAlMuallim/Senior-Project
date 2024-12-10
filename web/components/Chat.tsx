"use client";
import { cx } from "class-variance-authority";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { listWithAnd, pluralize, run } from "@/lib/utils";
import { useLiveMessages } from "@/hooks/useChat";
import { Button } from "./ui/button";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef } from "react";
import AddMessageForm from "./AddMessageForm";
import { FileIcon } from "lucide-react";

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

const Chat = ({ groupId }: { groupId: string }) => {
  const liveMessages = useLiveMessages(groupId);
  const currentlyTyping = trpc.groups.whoIsTyping.useSubscription({
    groupId,
  });
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
  }, [liveMessages.messages]);

  useEffect(() => {
    scrollToBottom();
  }, [groupId]);

  const renderAttachment = (attachmentUrl: string, type: string | null) => {
    if (!type) {
      return null;
    }
    if (type.includes("image")) {
      return (
        <img
          src={attachmentUrl}
          alt="Attached image"
          className="max-w-xs rounded-lg"
        />
      );
    } else if (type.includes("audio")) {
      return (
        <audio controls className="max-w-xs">
          <source src={attachmentUrl} type={`audio/webm`} />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      return (
        <a
          href={attachmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <FileIcon className="size-4" />
          Download attachment
        </a>
      );
    }
  };

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <div className="relative flex items-center justify-center gap-2 p-4 sm:p-6 lg:p-8">
        <div className="absolute right-0 top-0 flex items-center justify-center gap-2 rounded-full p-2 text-sm">
          <SubscriptionStatus subscription={liveMessages.subscription} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" ref={scrollRef}>
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
          {[...(liveMessages.messages || [])].reverse().map((item) => {
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
                    {user?.firstName ? user.firstName[0] : "X"}
                    {user?.lastName ? user?.lastName[0] : ""}
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
                    {!!item.text && <p>{item.text}</p>}
                    {item.attachment_url &&
                      renderAttachment(
                        item.attachment_url,
                        item.attachment_type,
                      )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isToday(item.createdAt)
                      ? formatDistanceToNow(item.createdAt) + " ago"
                      : format(item.createdAt, "MMM d, yyyy h:mm a")}
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
      <div className="sticky bottom-0 border-t bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
        <AddMessageForm
          groupId={groupId}
          onMessagePost={() => {
            scrollRef.current?.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }}
        />
      </div>
    </section>
  );
};

export default Chat;

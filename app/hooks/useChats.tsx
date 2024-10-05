import { trpc } from "@/lib/trpc";
import { skipToken } from "@tanstack/react-query";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Platform } from "react-native";

export function useWhoIsTyping(groupId: string) {
  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([]);
  trpc.groups.whoIsTyping.useSubscription(
    { groupId },
    {
      onData(list) {
        setCurrentlyTyping(list);
      },
      onError(err) {
        console.error("ERROR: ", err);
      },
      onStarted() {
        console.log(Platform.OS);
        console.log("Subscription started");
      },
    },
  );
  return currentlyTyping;
}

/**
 * Set isTyping with a throttle of 1s
 * Triggers immediately if state changes
 */
// export function useThrottledIsTypingMutation(groupId: string, userId: string) {
//   const isTyping = trpc.groups.isTyping.useMutation({});
//
//   return useMemo(() => {
//     let state = false;
//     let timeout: ReturnType<typeof setTimeout> | null;
//     function trigger() {
//       timeout && clearTimeout(timeout);
//       timeout = null;
//
//       console.log("STATE", state);
//       isTyping.mutate({ typing: state, groupId, userId });
//     }
//
//     return (nextState: boolean) => {
//       const shouldTriggerImmediately = nextState !== state;
//
//       state = nextState;
//       if (shouldTriggerImmediately) {
//         trigger();
//       } else if (!timeout) {
//         timeout = setTimeout(trigger, 200);
//       }
//       console.log("IS TYPING: ", isTyping);
//     };
//   }, [groupId, userId]);
// }

export function useThrottledIsTypingMutation(groupId: string, userId: string) {
  const isTyping = trpc.groups.isTyping.useMutation({});

  return useMemo(() => {
    let state = false; // Keeps track of the typing state
    let timeout: ReturnType<typeof setTimeout> | null;

    // Trigger function to send typing status to the server
    function trigger() {
      if (timeout) {
        clearTimeout(timeout); // Clear any pending timeouts
        timeout = null;
      }

      isTyping.mutate(
        { typing: state, groupId, userId },
        {
          onSuccess: () => {},
          onError: (error) => {
            console.error("Error sending typing status", error);
          },
        },
      );
    }

    return (nextState: boolean) => {
      const shouldTriggerImmediately = nextState !== state;

      // Update the typing state
      state = nextState;

      if (shouldTriggerImmediately) {
        trigger(); // Trigger immediately if typing state changes
      } else if (!timeout) {
        // If the typing state didn't change, use throttling (200ms delay)
        timeout = setTimeout(trigger, 200);
      }
    };
  }, [groupId, userId]);
}

export function useLivePosts(groupId: string) {
  const [data, query] = trpc.messages.infinite.useSuspenseInfiniteQuery(
    { groupId },
    {
      getNextPageParam: (d) => (d.nextCursor ? new Date(d.nextCursor) : null),
      // No need to refetch as we have a subscription
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
  const utils = trpc.useUtils();
  const [messages, setMessages] = useState(() => {
    const msgs = query.data?.pages.map((page) => page.items).flat();
    return msgs ?? null;
  });
  type Post = NonNullable<typeof messages>[number];

  /**
   * fn to add and dedupe new messages onto state
   */
  const addMessages = useCallback((incoming?: Post[]) => {
    setMessages((current) => {
      const map: Record<Post["id"], Post> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    });
  }, []);

  /**
   * when new data from `useInfiniteQuery`, merge with current state
   */
  useEffect(() => {
    const msgs = query.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [query.data?.pages, addMessages]);

  const [lastEventId, setLastEventId] = useState<
    // Query has not been run yet
    | false
    // Empty list
    | null
    // Event id
    | string
  >(false);
  if (messages && lastEventId === false) {
    // We should only set the lastEventId once, if the SSE-connection is lost, it will automatically reconnect and continue from the last event id
    // Changing this value will trigger a new subscription
    setLastEventId(messages.at(-1)?.id ?? null);
  }
  trpc.messages.onAdd.useSubscription(
    lastEventId === false ? skipToken : { groupId, lastEventId },
    {
      onData(event) {
        addMessages([event.data]);
      },
      onError(err) {
        console.error("Subscription error:", err);
        utils.messages.infinite.invalidate();
      },
    },
  );
  return {
    query,
    messages,
  };
}

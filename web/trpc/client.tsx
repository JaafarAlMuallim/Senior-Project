"use client";

import { useState, useEffect, useCallback } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  httpBatchLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useSession } from "@clerk/nextjs";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "../../server/src/routers/index";

export const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  return "http://localhost:8080/trpc";
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { session } = useSession();
  const [trpcClient, setTrpcClient] = useState<ReturnType<
    typeof trpc.createClient
  > | null>(null);
  const queryClient = getQueryClient();

  const getToken = useCallback(async () => {
    try {
      return await session?.getToken({ template: "supabase" });
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  }, [session]);

  useEffect(() => {
    const initTrpcClient = async () => {
      const token = await getToken();
      const newClient = trpc.createClient({
        links: [
          splitLink({
            condition: (op) => op.type === "subscription",
            true: unstable_httpSubscriptionLink({
              url: getUrl(),
              EventSource: EventSourcePolyfill,
              eventSourceOptions: async () => {
                return {
                  headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                  },
                };
              },
            }),
            false: httpBatchLink({
              url: getUrl(),
              headers: async () => {
                return {
                  Authorization: token ? `Bearer ${token}` : "",
                };
              },
            }),
          }),
        ],
      });

      setTrpcClient(newClient);
    };

    initTrpcClient();
  }, [getToken]);

  if (!trpcClient) {
    return null; // or a loading indicator
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

"use client";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  httpBatchLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "../../server/src/routers/index";
import { useSession } from "@clerk/nextjs";
export const trpc = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
  const base = (() => {
    return "http://localhost:8080";
  })();
  return `${base}/trpc`;
}
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { session } = useSession();

  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: unstable_httpSubscriptionLink({
            url: getUrl(),
            EventSource: EventSourcePolyfill,
            eventSourceOptions: async () => {
              const token = await session?.getToken({
                template: "supabase",
              });
              return {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              };
            },
          }),
          false: httpBatchLink({
            url: getUrl(),
            headers: async () => {
              const token = await session?.getToken({
                template: "supabase",
              });
              return {
                authorization: `Bearer ${token}`,
              };
            },
          }),
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

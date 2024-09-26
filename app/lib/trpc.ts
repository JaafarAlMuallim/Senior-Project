// utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../../server/src/routers";

export const trpc = createReactQueryHooks<AppRouter>();

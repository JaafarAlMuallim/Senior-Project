import { cache } from "react";
import { createContext } from "../../server/src/trpc";
import { auth } from "@clerk/nextjs/server";
export const createTRPCContext = cache(async () => {
  const authed = await auth();
  const token = await authed.getToken({
    template: "supabase",
  });
  const headers = {
    authorization: `Bearer ${token}`,
  };
  return createContext({
    req: {
      headers: {
        authorization: headers.authorization,
      },
    },
  });
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

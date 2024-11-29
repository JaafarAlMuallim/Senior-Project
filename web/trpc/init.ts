import { cache } from "react";
import { createContext } from "../../server/src/trpc";
export const createTRPCContext = cache(createContext);
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

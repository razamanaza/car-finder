import type { AppRouter } from "@server/routes";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";

import { env } from "../env";
import { logError } from "./errorUtils";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        (process.env.NODE_ENV === "development" && typeof window !== "undefined") ||
        (opts.direction === "down" && opts.result instanceof Error),
      logger(opts) {
        if (opts.direction === "down" && opts.result instanceof Error) {
          logError("tRPC", opts.result).catch((loggerError) => {
            if (import.meta.env.DEV) {
              console.warn("Failed to log tRPC error:", loggerError);
            }
          });
        }
      },
    }),
    httpBatchLink({
      url: `${env.VITE_URL_BACKEND}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

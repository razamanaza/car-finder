import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "@server/routes";
import { logError } from "./errorUtils";

const backendUrl = import.meta.env.VITE_URL_BACKEND;

if (!backendUrl) {
  throw new Error("VITE_URL_BACKEND environment variable is not defined");
}

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
      url: `${backendUrl}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc";

export function useHealthCheck() {
  const trpc = useTRPC();
  const query = useSuspenseQuery({
    ...trpc.health.trpc.queryOptions(),
  });

  return query;
}

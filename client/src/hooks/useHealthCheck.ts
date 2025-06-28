import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTRPC } from "@/lib/trpc";
import { useQueryErrorToast } from "@/hooks/useQueryErrorToast";

export function useHealthCheck() {
  const trpc = useTRPC();
  const query = useQuery({
    ...trpc.health.trpc.queryOptions(),
  });

  const { isError, error, refetch } = query;

  useQueryErrorToast(isError, error);

  const handleRetry = () => {
    refetch();
    toast.loading("Retrying...", { duration: 1000 });
  };

  return { ...query, handleRetry };
}

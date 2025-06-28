import { useEffect } from "react";
import { logError } from "@/lib/errorUtils";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@server/routes";

export function useQueryErrorToast(isError: boolean, error: TRPCClientErrorLike<AppRouter> | null) {
  useEffect(() => {
    if (isError && error) {
      logError("useQueryErrorToast", error, { displayToast: true });
    }
  }, [isError, error]);
}

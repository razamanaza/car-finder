import type { AppRouter } from "@server/routes";
import type { TRPCClientErrorLike } from "@trpc/client";
import { useEffect } from "react";

import { logError } from "@/lib/errorUtils";

export function useQueryErrorToast(isError: boolean, error: TRPCClientErrorLike<AppRouter> | null) {
  useEffect(() => {
    if (isError && error) {
      logError("useQueryErrorToast", error, { displayToast: true });
    }
  }, [isError, error]);
}

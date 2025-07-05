import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { getQueryClient } from "@/lib/queryClient";
import { TRPCProvider } from "@/lib/trpc";
import { trpc } from "@/lib/trpcClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpc} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

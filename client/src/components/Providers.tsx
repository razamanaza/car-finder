import { QueryClientProvider } from "@tanstack/react-query";
import { TRPCProvider } from "@/lib/trpc";
import { getQueryClient } from "@/lib/queryClient";
import { trpc } from "@/lib/trpcClient";
import React from "react";

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

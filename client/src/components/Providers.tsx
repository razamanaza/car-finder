import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { getQueryClient } from "@/lib/queryClient";
import { TRPCProvider } from "@/lib/trpc";
import { trpc } from "@/lib/trpcClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TRPCProvider trpcClient={trpc} queryClient={queryClient}>
          {children}
        </TRPCProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

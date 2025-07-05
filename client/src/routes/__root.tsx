import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { AsyncBoundary } from "@/components/AsyncBoundary";
import { Providers } from "@/components/Providers";
import AppLayout from "@/layout/AppLayout";

function RootComponent() {
  const isDev = import.meta.env.DEV;

  return (
    <>
      <Providers>
        <AsyncBoundary>
          <AppLayout />
        </AsyncBoundary>
        {isDev && <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left" />}
      </Providers>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      {isDev && (
        <TanStackRouterDevtools
          position="bottom-right"
          toggleButtonProps={{
            style: {
              marginLeft: "auto",
              marginRight: "10px",
            },
          }}
        />
      )}
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

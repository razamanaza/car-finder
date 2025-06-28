import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import AppLayout from "@/layout/AppLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Providers } from "@/components/Providers";

function RootComponent() {
  const isDev = import.meta.env.DEV;

  return (
    <>
      <Providers>
        <ErrorBoundary>
          <AppLayout />
        </ErrorBoundary>
        {isDev && <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="bottom-left" />}
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

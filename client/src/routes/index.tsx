import { createFileRoute } from "@tanstack/react-router";

import { AsyncBoundary } from "@/components/AsyncBoundary";
import { useHealthCheck } from "@/hooks/useHealthCheck";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function HealthCheckStatus() {
  const { data } = useHealthCheck();

  return (
    <>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h2 className="text-green-800 font-semibold mb-2">✅ Connection Successful</h2>
        <p className="text-green-600">Server response: {data.message}</p>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Hello "/"!</h1>
        <p className="text-gray-600">This page demonstrates proper error handling with network requests.</p>
      </div>
    </>
  );
}

function RouteComponent() {
  return (
    <div className="p-4">
      <AsyncBoundary>
        <HealthCheckStatus />
      </AsyncBoundary>
    </div>
  );
}

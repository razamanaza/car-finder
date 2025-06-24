import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "../lib/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.health.trpc.queryOptions());

  if (isLoading) {
    return <h1>Loading data ...</h1>;
  }

  return (
    <>
      <div>Hello "/"!</div>
      {data?.message}
    </>
  );
}

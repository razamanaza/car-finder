import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../../server/src/routes";
import type { inferRouterOutputs } from "@trpc/server";
export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();
export type RouterOutput = inferRouterOutputs<AppRouter>;

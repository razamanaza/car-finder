import { router } from "../trpc";
import healthRouter from "./healthRouter";

export const appRouter = router({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;

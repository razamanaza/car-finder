import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import createContext from "@/context";
import { appRouter, AppRouter } from "@/routes";
import { env } from "@/env";
import { authHandler } from "@/handlers/auth";

const fastify = Fastify({
  maxParamLength: 5000,
  // logger: true,
});

const start = async () => {
  try {
    await fastify.register(fastifyCors, {
      credentials: true,
      origin: env.CLIENT_URL,
    });

    await fastify.register(fastifyCookie);

    fastify.route({
      method: ["GET", "POST"],
      url: "/api/auth/*",
      handler: authHandler,
    });

    fastify.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ message: "Hello world!" });
    });

    await fastify.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      trpcOptions: {
        router: appRouter,
        createContext,
        onError({ path, error }) {
          console.error(`Error in tRPC handler on path '${path}':`, error);
        },
      } as FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
    });

    await fastify.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });
    console.log("Server is running on port " + env.PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import createContext from "./context";
import dotenv from "dotenv";
import { appRouter, AppRouter } from "./routes";
dotenv.config({ path: "../server.env" });

const fastify = Fastify({
  maxParamLength: 5000,
  logger: true,
});

const start = async () => {
  try {
    await fastify.register(fastifyCors, {
      credentials: true,
      origin: process.env.CLIENT_URL,
    });

    await fastify.register(fastifyCookie);

    fastify.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ message: "Hello world!" });
    });

    await fastify.register(fastifyTRPCPlugin, {
      prefix: "/",
      trpcOptions: {
        router: appRouter,
        createContext,
        onError({ path, error }) {
          console.error(`Error in tRPC handler on path '${path}':`, error);
        },
      } as FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
    });

    const port = Number(process.env.PORT) || 2022;
    await fastify.listen({
      port,
      host: "0.0.0.0",
    });
    console.log("Server is running on port " + port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

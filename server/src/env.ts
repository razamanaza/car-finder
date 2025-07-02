import { serverEnvSchema } from "@car-finder/shared/schemas/env";
import { config } from "dotenv";
config({ path: "../server.env" });

const envVars = {
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  DATABASE_URL: process.env.DATABASE_URL,
};

export const env = serverEnvSchema.parse(envVars);

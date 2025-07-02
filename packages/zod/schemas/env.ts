import { z } from "zod";

export const clientEnvSchema = z.object({
  VITE_URL_BACKEND: z.string().url(),
});

export const serverEnvSchema = z.object({
  PORT: z.coerce.number().default(4100),
  CLIENT_URL: z.string().url(),
  DATABASE_URL: z.string(),
});

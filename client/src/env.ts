import { clientEnvSchema } from "@car-finder/shared/schemas/env";

const envVars = {
  VITE_URL_BACKEND: import.meta.env.VITE_URL_BACKEND,
};

export const env = clientEnvSchema.parse(envVars);

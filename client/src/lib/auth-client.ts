import { createAuthClient } from "better-auth/react";
const url = import.meta.env.VITE_URL_BACKEND;
import { auth } from "@server/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  baseURL: url,
});

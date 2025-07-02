import { drizzleOrm_NodePostgres } from "@car-finder/drizzle";
import * as schema from "@car-finder/drizzle";
import { env } from "@/env";
const { drizzle } = drizzleOrm_NodePostgres;

export const databaseUrl = env.DATABASE_URL;

export const db = drizzle(databaseUrl, { schema });

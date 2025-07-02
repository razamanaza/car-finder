import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { drizzleOrm_NodePostgres } from "@car-finder/drizzle";
import { drizzleOrm } from "@car-finder/drizzle";
const { eq } = drizzleOrm;
const { drizzle } = drizzleOrm_NodePostgres;
import { userTable } from "@car-finder/drizzle";
import * as schema from "@car-finder/drizzle";
import { env } from "./env";
// import { fromNodeHeaders } from "better-auth/node";
// import { Auth } from "better-auth";

const config = { databaseUrl: env.DATABASE_URL };
export const db = drizzle(env.DATABASE_URL, { schema });
// const auth = new Auth();
const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  // const headers = fromNodeHeaders(req.headers);
  // const data = await auth.api.getSession({
  //   headers, //some endpoint might require headers
  // });

  // if (data) {
  //   try {
  //     const user = await db.query.userTable.findFirst({ where: eq(userTable.id, data.user.id) });
  //     if (!user) throw new Error("User not found");

  //     return { req, res, user, db, config };
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  return { req, res, user: undefined, db, config };
};

export default createContext;

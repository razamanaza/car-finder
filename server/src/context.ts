import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
// import { drizzleOrm_NodePostgres } from "@car-finder/drizzle";
// import { drizzleOrm } from "@car-finder/drizzle";
// const { eq } = drizzleOrm;
// const { drizzle } = drizzleOrm_NodePostgres;
// import { userTable } from "@car-finder/drizzle";
// import * as schema from "@car-finder/drizzle";
import * as dotenv from "dotenv";
dotenv.config({ path: "../server.env" });
// import { fromNodeHeaders } from "better-auth/node";

// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) throw new Error("DATABASE_URL is not defined");
// const config = { databaseUrl };
// export const db = drizzle(databaseUrl, { schema });
const test = {
  hello: "world",
};
const user = undefined;

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
  return { req, res, test, user };
};

export default createContext;

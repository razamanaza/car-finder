import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { drizzleOrm } from "@car-finder/drizzle";
const { eq } = drizzleOrm;
import { userTable } from "@car-finder/drizzle";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "@/lib/auth";
import { databaseUrl, db } from "@/lib/db";

const config = { databaseUrl };

const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  const headers = fromNodeHeaders(req.headers);
  const data = await auth.api.getSession({
    headers, //some endpoint might require headers
  });

  if (data) {
    try {
      const user = await db.query.userTable.findFirst({ where: eq(userTable.id, data.user.id) });
      if (!user) throw new Error("User not found");

      return { req, res, user, db, config };
    } catch (error) {
      console.log("error", error);
    }
  }
  return { req, res, db, config };
};

export default createContext;

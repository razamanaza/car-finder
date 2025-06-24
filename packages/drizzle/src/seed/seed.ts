import { initUsersData } from "./initUsersData";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { userTable, verificationTable, accountTable, sessionTable } from "../db/schema";
import * as schema from "../db/schema";
import dotenv from "dotenv";

dotenv.config({ path: "../../server.env" });
const databaseUrl = process.env.DATABASE_URL!;
const db = drizzle(databaseUrl, { schema });

const main = async () => {
  console.log(`Seeding ${databaseUrl}...`);

  await db.delete(verificationTable);
  await db.delete(accountTable);
  await db.delete(sessionTable);
  await db.delete(userTable);

  for (const user of initUsersData) {
    let userNew = await db.insert(userTable).values(user).returning({ id: userTable.id });
    console.log(`Inserted user ${userNew[0].id}`);
    await db.insert(accountTable).values({
      userId: userNew[0].id,
      providerId: "credential",
      accountId: userNew[0].id,
      password: user.password,
    });
    console.log(`Inserted account for user ${userNew[0].id}`);
  }

  const userCheck = await db.query.userTable.findFirst({
    where: eq(userTable.email, "alan@example.com"),
    columns: { id: true, name: true, image: true },
  });

  console.log(userCheck);
  console.log(`Done!`);
  process.exit(0);
};
main();

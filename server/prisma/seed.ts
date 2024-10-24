import {
  Category,
  PrismaClient as PostgresClient,
} from "@prisma/postgres/client";
import { PrismaClient as MongoClient } from "@prisma/mongo/client";

const postgres = new PostgresClient();
const mongo = new MongoClient();

async function main() {}

main()
  .then(() => {
    console.log("Seeded groups");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await postgres.$disconnect();
    await mongo.$disconnect();
  });

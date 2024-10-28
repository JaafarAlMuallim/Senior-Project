// import { PrismaClient } from "@prisma/client/react-native";
// import { reactiveHooksExtension } from "@prisma/react-native";
//
// const basePrisma = new PrismaClient({
//   log: ["query", "info", "warn"],
// });
//
// export async function initializeDB() {
//   try {
//     console.log("Migrations applied");
//     await basePrisma.$applyPendingMigrations();
//   } catch (e) {
//     console.error(`failed to apply migrations: ${e}`);
//     throw new Error(
//       "Applying migrations failed, your app is now in an inconsistent state. We cannot guarantee safety, it is now your responsability to reset the database or tell the user to re-install the app",
//     );
//   }
// }
// // You should always call this at the start of the application
// // failure to migrate might leave you with a non working app version
//
// // Examples of a reactive client for REACT
// export const db = basePrisma.$extends(reactiveHooksExtension());

import express from "express";
import { authRouter } from "./routes/auth";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./trpc";

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
);
app.use("/auth", authRouter);
app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

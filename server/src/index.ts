import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./routers";
import { createContext } from "./trpc";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:3001",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
};

const port = 8080;

const app = express();

app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
);
app.get("*", async (_, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

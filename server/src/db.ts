import { PrismaClient as PostgresClient } from "@prisma/postgres/client";
import { PrismaClient as MongoClient } from "@prisma/mongo/client";

import Redis from "ioredis";

declare global {
  var cachedPostgres: PostgresClient;
  var cachedMongo: MongoClient;
  var cachedRedis: Redis;
}

let postgres: PostgresClient;
let mongo: MongoClient;
let redis: Redis;
if (process.env.NODE_ENV === "production") {
  postgres = new PostgresClient();
  mongo = new MongoClient();
  redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
} else {
  if (!global.cachedPostgres) {
    global.cachedPostgres = new PostgresClient();
  }
  if (!global.cachedMongo) {
    global.cachedMongo = new MongoClient();
  }
  if (!global.cachedRedis) {
    global.cachedRedis = new Redis(
      process.env.REDIS_URL || "redis://localhost:6379",
    );
  }

  postgres = global.cachedPostgres;
  redis = global.cachedRedis;
  mongo = global.cachedMongo;
}

export const postgresClient = postgres;
export const mongoClient = mongo;
export const redisClient = redis;

import { redisClient } from "../db";

export const subscribeToGroup = async (groupId: string, userId: string) => {
  await redisClient.sadd(`group:${groupId}:subscriptions`, userId);
};

export const unsubscribeFromGroup = async (groupId: string, userId: string) => {
  await redisClient.srem(`group:${groupId}:subscriptions`, userId);
};

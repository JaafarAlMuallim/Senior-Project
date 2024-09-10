"use server";

import { db } from "@/db";

export async function signUpUser({
  name,
  email,
  clerkId,
}: {
  name: string;
  email: string;
  clerkId: string;
}) {
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        clerkId,
      },
    });
    return user;
  } catch (error) {
    console.error("Error while signing up user:", error);
    throw error;
  }
}

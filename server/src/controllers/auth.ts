import { db } from "../db";

export const signUp = async ({
  input,
}: {
  input: { email: string; name: string; clerkId: string };
}) => {
  const { email, name, clerkId } = input;
  try {
    if (!email || !name || !clerkId) {
      throw new Error("Missing required fields");
    }
    console.log(email, name, clerkId);
    const checker = await db.user.findUnique({
      where: {
        clerkId,
      },
    });
    if (checker) {
      throw new Error("Clerk ID already exists, Login");
    }
    const data = await db.user.create({
      data: {
        email,
        name,
        clerkId,
      },
    });
    const profile = await db.profile.create({
      data: {
        userId: clerkId,
      },
    });
    await db.user.update({
      where: {
        clerkId,
      },
      data: {
        profileId: profile.id,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

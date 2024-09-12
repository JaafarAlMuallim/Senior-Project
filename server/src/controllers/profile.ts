import { db } from "../db";
import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  standing: z.string(),
});

export const getProfile = async ({ input }: { input: { clerkId: string } }) => {
  const { clerkId } = input;
  const profile = await db.profile.findUnique({
    where: {
      userId: clerkId,
    },
  });
  if (!profile) {
    throw new Error("Profile does not exist");
  }
  return profile;
};

export const updateProfile = async ({
  input,
}: {
  input: { clerkId: string; data: Partial<z.infer<typeof profileSchema>> };
}) => {
  const { clerkId, data } = input;
  try {
    const profile = await db.profile.update({
      where: {
        userId: clerkId,
      },
      data,
    });
    return profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

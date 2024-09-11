import { Request, Response, NextFunction } from "express";
import { db } from "../db";
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, clerkId } = req.body;
  console.log(req.body);
  try {
    if (!email || !name || !clerkId) {
      return res.status(400).send("Missing required fields");
    }
    const checker = await db.user.findUnique({
      where: {
        clerkId,
      },
    });
    if (checker) {
      return res.status(400).send("Clerk ID already exists, Login");
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
        user: {
          connect: {
            id: data.id,
          },
        },
      },
    });
    return res.send(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import { db } from "../db";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, ...rest } = req.body;
    const data = await db.profile.update({
      where: {
        id: id,
      },
      data: rest,
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

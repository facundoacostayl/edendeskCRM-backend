import { Response } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";

export const getInfo = (req: RequestExt, res: Response) => {
  try {
    const user = req.user as UserType;
    const userId = user.id;
    const userRole = user.role;

    return res
      .status(200)
      .send(`Welcome user with id: ${userId}. Your role is: ${userRole}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
};

import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";

const authRole = (req: RequestExt, res: Response, next: NextFunction) => {
  const user = req.user as UserType;

  if (user.role !== "admin") {
    return res.status(400).send("Only admin users allowed");
  }

  next();
};

export { authRole };

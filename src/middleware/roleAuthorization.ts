import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const authRole = (req: RequestExt, res: Response, next: NextFunction) => {
  const user = req.user as UserType;
  if (user.role !== "admin") {
    return responseHandler(
      "Error",
      httpStatusCodes.UNAUTHORIZED,
      "Just users with Admin role allowed"
    );
  }
  next();
};

export { authRole };
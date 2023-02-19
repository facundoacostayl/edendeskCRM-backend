import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const authRole = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    //Req user data from req.user
    const user = req.user as UserType;

    //Verify if the role of the user is "admin", otherwise returning error
    if (user.role !== "admin") {
      throw new Error("Admin role is needed for this request");
    }
    next();
  } catch (error) {
    error instanceof Error &&
      res.status(httpStatusCodes.UNAUTHORIZED).json(error.message);
  }
};

export { authRole };

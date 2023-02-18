import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const authRole = (req: RequestExt, res: Response, next: NextFunction) => {
  //Req user data from req.user
  const user = req.user as UserType;

  console.log(user);

  /*Verify if the role of the user is "admin", otherwise returning error
  if (user.role !== "basic") {
    return responseHandler(
      "Error",
      httpStatusCodes.UNAUTHORIZED,
      "Just users with Admin role allowed"
    );
  }*/
  next();
};

export { authRole };

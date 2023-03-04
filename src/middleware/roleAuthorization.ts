import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";
import { httpStatusCodes } from "../utils/httpStatusCodes";
import { ROLE } from "../utils/userRoles";

const authRole = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    //Req user data from req.user
    const user = req.user as UserType;

    //Verify if the role of the user is "admin", otherwise returning error
    if (user.role !== ROLE.ADMIN) {
      throw new Error("Acceso denegado. Contacta a un administrador");
    }
    next();
  } catch (error) {
    error instanceof Error &&
      res.status(httpStatusCodes.UNAUTHORIZED).json(error.message);
  }
};

export { authRole };

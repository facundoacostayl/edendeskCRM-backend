import { Response } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { UserType } from "../interfaces/user.interface";
import { getDashboard } from "../services/dashboard.service";
import { ErrorWithStatus, throwErrorWithStatus } from "../utils/error.handle";

const getItem = (req: RequestExt, res: Response) => {
  try {
    const user = req.user as UserType;
    const userId = user.id;
    const userRole = user.role;

    const response = getDashboard(userId, userRole);

    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).send(response.message);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      console.error(error.message);
      res.status(error.statusCode).json(error.message);
    }
  }
};

export { getItem };

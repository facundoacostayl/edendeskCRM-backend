import { Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/requestExt.interface";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const authJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token as string;
    const jwt = token && token.split(" ").pop();

    if (!jwt) {
      return res.status(httpStatusCodes.FORBIDDEN).json(false);
    }

    const isVerified = jwtVerify(jwt);

    if (!isVerified) {
      return res.status(httpStatusCodes.FORBIDDEN).send("JWT is not valid");
    }

    req.user = isVerified;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(httpStatusCodes.INTERNAL_SERVER).json(false);
    }
  }
};

export { authJwt };

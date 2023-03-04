import { Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/requestExt.interface";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const authJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    //Req token from headers
    const token = req.headers.token as string;

    //Split "Bearer" from token
    const jwt = token && token.split(" ").pop();

    //Verify if required jwt exists, otherwise returning error
    if (!jwt) {
      return res.status(httpStatusCodes.FORBIDDEN).json("JWT not found");
    }

    //Verify required jwt and get data
    const isVerified = jwtVerify(jwt);

    //Verify if required jwt is a valid JWT token, otherwise returning error
    if (!isVerified) {
      return res.status(httpStatusCodes.FORBIDDEN).send("JWT is not valid");
    }

    //Attach isVerified data to req.user
    req.user = isVerified;

    if (isVerified) {
      console.log(isVerified);
      next();
    } else {
      return res.status(httpStatusCodes.FORBIDDEN).send("req.user not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(httpStatusCodes.INTERNAL_SERVER).json(false);
    }
  }
};

export { authJwt };

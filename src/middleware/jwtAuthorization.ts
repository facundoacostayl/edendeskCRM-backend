import { Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/requestExt.interface";

const authJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token as string;
    const jwt = token && token.split(" ").pop();

    if (!jwt) {
      return res.status(403).json(false);
    }

    const isVerified = jwtVerify(jwt);

    if (!isVerified) {
      return res.status(403).send("JWT is not valid");
    }

    req.user = isVerified;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(403).json(false);
    }
  }
};

export { authJwt };

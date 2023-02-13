import { Request, Response, NextFunction } from "express";

import jwtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface ReqWithUser extends Request {
  user: number;
}

const authorization = async (
  req: ReqWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.status(403).json(false);
    }

    const payload = jwtoken.verify(
      token,
      process.env.JWT_SECRET as jwtoken.Secret
    );
    //req.user = payload.user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(403).json(false);
    }
  }
};

export { authorization };

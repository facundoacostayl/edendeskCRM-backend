import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserType } from "./user.interface";

interface RequestExt extends Request {
  user?: string | JwtPayload | UserType;
}

export { RequestExt };

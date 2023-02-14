import { UserType } from "../interfaces/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const jwtSecret = `${process.env.JWT_SECRET}`;

const jwtGenerator = (userId: UserType["id"]) => {
  const payload = {
    userId,
  };

  return jwt.sign(payload, jwtSecret, {
    expiresIn: "2hr",
  });
};

const jwtVerify = (jwtToken: string) => {
  const isValidated = jwt.verify(jwtToken, jwtSecret);
  return isValidated;
};

export { jwtSecret, JwtPayload, jwtGenerator, jwtVerify };

import { UserType } from "../interfaces/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//Gettins jwt secret key from environment variables
const jwtSecret = `${process.env.JWT_SECRET}`;

//Function for generating a jwt
const jwtGenerator = (id: UserType["id"], role: UserType["role"]) => {
  //Payload to be encrypted
  const payload = {
    id,
    role,
  };

  //Returning token
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "2hr",
  });
};

//Function for verifying a jwt
const jwtVerify = (jwtToken: string) => {
  const isValidated = jwt.verify(jwtToken, jwtSecret);
  return isValidated;
};

export { jwtSecret, JwtPayload, jwtGenerator, jwtVerify };

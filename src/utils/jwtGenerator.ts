import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const jwtGenerator = (user_id: number) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "1hr",
  });
};

export { jwtGenerator };

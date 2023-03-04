import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const getDashboard = (userId: UserType["id"], userRole: UserType["role"]) => {
  if (!userId || !userRole) {
    return responseHandler(
      "Error",
      httpStatusCodes.INTERNAL_SERVER,
      "Internal server error"
    );
  }
  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    `Bienvenido usuario con id: ${userId}. Tu rol es: ${userRole}`
  );
};

export { getDashboard };

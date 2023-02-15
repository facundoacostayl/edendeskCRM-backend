import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";

const getDashboard = (userId: UserType["id"], userRole: UserType["role"]) => {
  if (!userId || userRole) {
    return responseHandler("Error", 500, "Internal server error");
  }
  return responseHandler(
    "Success",
    200,
    `Welcome user with id: ${userId}. Your role is: ${userRole}`
  );
};

export { getDashboard };

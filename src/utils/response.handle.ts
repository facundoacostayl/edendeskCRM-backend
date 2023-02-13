import { ResponseType } from "../interfaces/response.interface";

export const responseHandler = (
  type: ResponseType["responseType"],
  statusCode: ResponseType["statusCode"],
  message?: ResponseType["message"],
  data?: ResponseType["data"],
  token?: ResponseType["token"]
): ResponseType => {
  const response: ResponseType = {
    responseType: type,
    statusCode,
    message,
    data,
    token,
  };
  return response;
};

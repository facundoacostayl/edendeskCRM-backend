import { UserType } from "./user.interface";
import { ClientType } from "./client.interface";
import { PaginationResponseDataType } from "./response.pagination.interface";

interface Response {
  responseType: "Success" | "Error";
  statusCode: number;
  message?: string;
  data?: UserType | UserType[] | ClientType | ClientType[] | PaginationResponseDataType;
  token?: string | number;
}

export { Response as ResponseType };

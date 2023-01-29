import { UserType } from "./user.interface";
import { ClientType } from "./client.interface";
import { PaginationDataType } from "./response.pagination.interface";

interface Response {
  responseType: "Success" | "Error";
  statusCode: number;
  message?: string;
  data?: UserType | UserType[] | ClientType | ClientType[] | PaginationDataType;
  token?: string | number;
}

export { Response as ResponseType };

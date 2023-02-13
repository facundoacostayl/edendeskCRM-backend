import { UserType } from "./user.interface";
import { ClientType } from "./client.interface";

interface PaginationResponseData {
  allValues: number;
  paginatedValues: UserType[] | ClientType[];
}

export { PaginationResponseData as PaginationResponseDataType };

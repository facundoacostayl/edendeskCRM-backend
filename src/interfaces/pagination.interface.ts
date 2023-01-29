import {ClientType} from './client.interface';

interface PaginationArgs {
  userid: ClientType["user"],
  page: number,
  size: number,
  sortBy: "nombre" | "saldo" | "created_at",
  orderBy: "ASC" | "DESC"
}

export {PaginationArgs as PaginationArgsType};
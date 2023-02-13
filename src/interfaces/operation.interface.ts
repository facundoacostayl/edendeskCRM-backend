import { UserType } from "./user.interface";

interface Operation {
  operationId: number;
  creationDay: number;
  creationMonth: number;
  creationYear: number;
  userEarnings: number;
  userLosses: number;
  totalSumOfBalances: number;
  dayTransactions: number;
  user: UserType["id"];
}

export { Operation as OperationType };

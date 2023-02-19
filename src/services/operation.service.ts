import { Operation } from "../config/entities/Operation";
import { User } from "../config/entities/User";
import { UserType } from "../interfaces/user.interface";
import { OperationType } from "../interfaces/operation.interface";
import { AppDataSource as dataSource } from "../config/db/db";
import { responseHandler } from "../utils/response.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";

const getFullOperationData = async (userId: UserType["id"]) => {
  //Find operations
  const operationList = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "o.user = u.id")
    .where("o.user = :userId", { userId })
    .getMany();

  if (!operationList) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Operations not found"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Operations found succesfully",
    operationList
  );
};

const getTodayOperationData = async (userId: UserType["id"]) => {
  //Find today's operation data
  let todayOperation = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "u.id = o.user")
    .where("o.user = :userId", { userId })
    .andWhere("o.creationDay = :creationDay", {
      creationDay: new Date().getDate(),
    })
    .andWhere("o.creationMonth = :creationMonth", {
      creationMonth: new Date().getMonth() + 1,
    })
    .andWhere("o.creationYear = :creationYear", {
      creationYear: new Date().getFullYear(),
    })
    .getOne();

  //If todayOperation doesn't exist, create a new one;
  if (!todayOperation) {
    //Find all operation list
    const operationList = await dataSource
      .getRepository(Operation)
      .createQueryBuilder("o")
      .innerJoinAndSelect(User, "u", "o.user = u.id")
      .where("o.operationId = :userId", { userId })
      .getMany();

    //Find yesterday operation data
    const operationListLength = operationList.length;
    const yesterdayOperation = operationList[operationListLength - 1];

    todayOperation = new Operation();
    todayOperation.creationYear = new Date().getFullYear();
    todayOperation.creationMonth = new Date().getMonth() + 1;
    todayOperation.creationDay = new Date().getDate();
    todayOperation.dayTransactions = 0;
    todayOperation.user = userId;
    //If yesterdayOperation exists, get its totalSumOfBalances, otherwise get 0;
    todayOperation.totalSumOfBalances = yesterdayOperation
      ? yesterdayOperation.totalSumOfBalances
      : 0;

    await todayOperation.save();

    return responseHandler(
      "Success",
      httpStatusCodes.OK,
      "Today's operation found succesfully",
      todayOperation
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Today's operation found succesfully",
    todayOperation
  );
};

const getMonthOperationData = async (
  userId: User["id"],
  creationMonth: OperationType["creationMonth"],
  creationYear: OperationType["creationYear"]
) => {
  //Find operations of a certain month
  const monthOperation = await dataSource //YEAR SHOULD MATCH TOO
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoin(User, "u", "o.user = u.id")
    .select("COUNT(o.gananciaUsuario)", "totalGananciasUsuario")
    .addSelect("COUNT(o.perdidaUsuario)", "totalPerdidasUsuario")
    .where("o.operationId = :userId", { userId })
    .andWhere("o.creationMonth = :creationMonth", { creationMonth })
    .andWhere("o.creationYear = :creationYear", { creationYear })
    .getRawOne();

  if (!monthOperation) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "No month operations found"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Month operation data found succesfully",
    monthOperation
  );
};

const getSumOfAllBalances = async (userId: User["id"]) => {
  //Find sum of balances
  const balances = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoin(User, "u", "o.user = u.id")
    .select("SUM(o.totalSumOfBalances)")
    .where("o.user = :userId", { userId })
    .getRawOne();

  if (!balances) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Balance data not found"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Total of balances found succesfully",
    balances.sum
  );
};

export {
  getFullOperationData,
  getTodayOperationData,
  getMonthOperationData,
  getSumOfAllBalances,
};

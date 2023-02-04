import { Operation } from "../config/entities/Operation";
import { User } from "../config/entities/User";
import { UserType } from "../interfaces/user.interface";
import {OperationType} from "../interfaces/operation.interface";
import { AppDataSource as dataSource } from "../config/db/db";
import { responseHandler } from "../utils/response.handle";

export const getFullOperationData = async (userid: UserType["id"]) => {
  //Find operations
  const operationList = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "o.user = u.id")
    .where("o.operationId = :userid", { userid })
    .getMany();

  if (!operationList) {
    return responseHandler("Error", 404, "Operations not found");
  }

  return responseHandler(
    "Success",
    200,
    "Operations found succesfully",
    operationList
  );
};

export const getTodayOperationData = async (userId: UserType["id"]) => {

    //Find today's operation data
    let todayOperation = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "o.user = u.id")
    .where("o.operationId = :userid", { userId })
    .andWhere("o.fechaDeCreacion = :creationDate", {creationDate: new Date().getDate()})
    .andWhere("o.mesDeCreacion = :creationMonth", {creationMonth: new Date().getMonth() + 1})
    .andWhere("o.añoDeCreacion = :creationYear", {creationYear: new Date().getFullYear})
    .getOne();

    //Find all operation list
    const operationList = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "o.user = u.id")
    .where("o.operationId = :userid", { userId })
    .getMany();

    //Find yesterday operation data
    const operationListLength = operationList.length;
    const yesterdayOperation = operationList[operationListLength - 1];    

    //If todayOperation doesn't exist, create a new one;
  if (!todayOperation) {
    todayOperation = new Operation();
    todayOperation.añoDeCreacion = new Date().getFullYear();
    todayOperation.mesDeCreacion = new Date().getMonth() + 1;
    todayOperation.fechaDeCreacion = new Date().getDate();
    todayOperation.user = userId;
    //If yesterdayOperation exists, get its totalDeSaldosUsuario, otherwise get 0;
    todayOperation.totalDeSaldosUsuario = yesterdayOperation
      ? yesterdayOperation.totalDeSaldosUsuario
      : 0;

    await todayOperation.save();

    return responseHandler('Success', 200, "Today's operation found succesfully", todayOperation)
  }
};

export const getMonthOperationData = async(userId: User['id'], month: OperationType['mesDeCreacion']) => {
    //Find operations of a certain month
    const monthOperation = await dataSource //YEAR SHOULD MATCH TOO
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoin(User, "u", "o.user = u.id")
    .select('COUNT(o.gananciaUsuario)', 'totalGananciasUsuario')
    .addSelect('COUNT(o.perdidaUsuario)', 'totalPerdidasUsuario')
    .where("o.operationId = :userId", { userId })
    .andWhere("o.mesDeCreacion = :creationMonth", {creationMonth: month})
    .getRawOne();

    if(!monthOperation) {
        return responseHandler('Error', 404, "No month operations found");
    }
      
  
      /*let incomes: number = 0;
      monthOperation.forEach((op) => (incomes += op.gananciaUsuario));
  
      let outcomes: number = 0;
      monthOperation.forEach((op) => (outcomes += op.perdidaUsuario));
      */

      return responseHandler("Success", 200, "Month operation data found succesfully", monthOperation);
}

export const getSumOfAllBalances = async(userid: User['id']) => {
  //Find sum of balances
  const balances = await dataSource
  .getRepository(Operation)
  .createQueryBuilder('o')
  .innerJoin(User, 'u', "o.user = u.id")
  .select("COUNT(o.gananciaUsuario)", "totalGananciasUsuario")
  .where("o.user = :userid", {userid})
  .getRawOne();

  if(!balances) {
    return responseHandler("Error", 404, "Balance data not found")
  }

  return responseHandler("Success", 200, "Total of balances found succesfully", balances);

} 
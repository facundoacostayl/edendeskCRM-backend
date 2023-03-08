"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSumOfAllBalances = exports.getMonthOperationData = exports.getTodayOperationData = exports.getFullOperationData = void 0;
const Operation_1 = require("../config/entities/Operation");
const User_1 = require("../config/entities/User");
const db_1 = require("../config/db/db");
const response_handle_1 = require("../utils/response.handle");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const getFullOperationData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Find operations
    const operationList = yield db_1.AppDataSource
        .getRepository(Operation_1.Operation)
        .createQueryBuilder("o")
        .innerJoinAndSelect(User_1.User, "u", "o.user = u.id")
        .where("o.user = :userId", { userId })
        .getMany();
    if (!operationList) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Lista de operaciones no encontrada");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Lista de operaciones encontrada exitosamente", operationList);
});
exports.getFullOperationData = getFullOperationData;
const getTodayOperationData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Find today's operation data
    let todayOperation = yield db_1.AppDataSource
        .getRepository(Operation_1.Operation)
        .createQueryBuilder("o")
        .innerJoinAndSelect(User_1.User, "u", "u.id = o.user")
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
        const operationList = yield db_1.AppDataSource
            .getRepository(Operation_1.Operation)
            .createQueryBuilder("o")
            .innerJoinAndSelect(User_1.User, "u", "o.user = u.id")
            .where("o.operationId = :userId", { userId })
            .getMany();
        //Find yesterday operation data
        const operationListLength = operationList.length;
        const yesterdayOperation = operationList[operationListLength - 1];
        todayOperation = new Operation_1.Operation();
        todayOperation.creationYear = new Date().getFullYear();
        todayOperation.creationMonth = new Date().getMonth() + 1;
        todayOperation.creationDay = new Date().getDate();
        todayOperation.dayTransactions = 0;
        todayOperation.user = userId;
        //If yesterdayOperation exists, get its totalSumOfBalances, otherwise get 0;
        todayOperation.totalSumOfBalances = yesterdayOperation
            ? yesterdayOperation.totalSumOfBalances
            : 0;
        yield todayOperation.save();
        return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Datos de operaciones del dia no encontrados", todayOperation);
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Datos de operaciones del dia encontrados exitosamente", todayOperation);
});
exports.getTodayOperationData = getTodayOperationData;
const getMonthOperationData = (userId, creationMonth, creationYear) => __awaiter(void 0, void 0, void 0, function* () {
    //Find operations of a certain month
    const monthOperation = yield db_1.AppDataSource //YEAR SHOULD MATCH TOO
        .getRepository(Operation_1.Operation)
        .createQueryBuilder("o")
        .innerJoin(User_1.User, "u", "o.user = u.id")
        .select("COUNT(o.gananciaUsuario)", "totalGananciasUsuario")
        .addSelect("COUNT(o.perdidaUsuario)", "totalPerdidasUsuario")
        .where("o.operationId = :userId", { userId })
        .andWhere("o.creationMonth = :creationMonth", { creationMonth })
        .andWhere("o.creationYear = :creationYear", { creationYear })
        .getRawOne();
    if (!monthOperation) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Datos de operaciones del mes no encontrados");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Datos de operaciones del mes encontrados exitosamente", monthOperation);
});
exports.getMonthOperationData = getMonthOperationData;
const getSumOfAllBalances = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Find sum of balances
    const balances = yield db_1.AppDataSource
        .getRepository(Operation_1.Operation)
        .createQueryBuilder("o")
        .innerJoin(User_1.User, "u", "o.user = u.id")
        .select("SUM(o.totalSumOfBalances)")
        .where("o.user = :userId", { userId })
        .getRawOne();
    if (!balances) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Informacion de saldos no encontrado");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Total de saldos encontrado exitosamente", balances.sum);
});
exports.getSumOfAllBalances = getSumOfAllBalances;

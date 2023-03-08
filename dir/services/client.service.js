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
exports.updateClient = exports.deleteClient = exports.searchClient = exports.substractFromClientBalance = exports.addToClientBalance = exports.createClient = exports.getClient = exports.getPaginationClientList = exports.getClients = void 0;
const Client_1 = require("../config/entities/Client");
const User_1 = require("../config/entities/User");
const Operation_1 = require("../config/entities/Operation");
const response_handle_1 = require("../utils/response.handle");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const db_1 = require("../config/db/db");
const getClients = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Find clients
    const clientList = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .getMany();
    //Verify if client list exists, otherwise returning error
    if (!clientList) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Lista no encontrada");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Lista encontrada exitosamente", clientList);
});
exports.getClients = getClients;
const getPaginationClientList = (userId, page, size, sortBy, orderBy) => __awaiter(void 0, void 0, void 0, function* () {
    //Set page number to index for multiplying it * the number of values setted in size.
    const pageIndex = page - 1;
    //Multiply pageIndex * the number of values setted in size.
    const numberOfValuesToSkip = size * pageIndex;
    //Rename "created_at" to "user" in order of order based on id number (the highest number, the last value created).
    const queryOfSortBy = sortBy === "created_at" ? "clientId" : sortBy;
    //Find all clients
    const allClients = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .getCount();
    //Find clients required and sorting them
    const clientsRequired = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoin(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .take(size)
        .skip(numberOfValuesToSkip)
        .orderBy(`c.${queryOfSortBy}`, orderBy)
        .getMany();
    //Verify if clients exists, otherwise returning error
    if (!clientsRequired) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Clientes no encontrados");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Clientes encontrados exitosamente", {
        allValues: allClients,
        paginatedValues: clientsRequired,
    });
});
exports.getPaginationClientList = getPaginationClientList;
const getClient = (userId, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    //Find Client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.clientId = :clientId", { clientId })
        .getOne();
    //Verify if user exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "El cliente no existe");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Cliente encontrado exitosamente", client);
});
exports.getClient = getClient;
const createClient = (firstName, lastName, tel, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Request in order to check if client has already been added
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.tel = :tel", { tel })
        .getOne();
    //Verify if client exists, otherwise returning error
    if (client) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "El cliente ya existe");
    }
    //Create new client
    const newClient = new Client_1.Client();
    newClient.firstName = firstName;
    newClient.lastName = lastName;
    newClient.tel = tel;
    newClient.balance = 0;
    newClient.lastAddDate = "No especificado";
    newClient.lastAddAmount = 0;
    newClient.lastWithdrawDate = "No especificado";
    newClient.lastWithdrawAmount = 0;
    newClient.addType = "No especificado";
    newClient.branch = "No especificado";
    newClient.user = userId;
    //Save client
    yield newClient.save();
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.CREATED, "Cliente añadido exitosamente", newClient);
});
exports.createClient = createClient;
//CHECK OPERATION FECHADECREACION ****
const addToClientBalance = (userId, clientId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    //Find client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.clientId = :clientId", { clientId })
        .getOne();
    //Verify if client and operation exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Cliente no encontrado");
    }
    //Find operation
    const operation = yield db_1.AppDataSource
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
    //Verify if client and operation exists, otherwise returning error
    if (!operation) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Datos de operacion no encontrados");
    }
    //Add to customer balance
    client.balance += amount;
    //Add date of operation
    const today = new Date();
    const todayDate = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    client.lastAddDate = todayDate;
    client.lastAddAmount = client.balance;
    //Add operation
    operation.userEarnings += amount;
    operation.totalSumOfBalances += amount;
    operation.dayTransactions++;
    !operation.creationDay
        ? (operation.creationDay = new Date().getDate())
        : null;
    //Save operation
    yield operation.save();
    //Save client
    yield client.save();
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Saldo actualizado exitosamente", client);
});
exports.addToClientBalance = addToClientBalance;
const substractFromClientBalance = (userId, clientId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    //Find client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.clientId = :clientId", { clientId })
        .getOne();
    //Verify if client and operation exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Cliente no encontrado");
    }
    //Find operation
    const operation = yield db_1.AppDataSource
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
    //Verify if client and operation exists, otherwise returning error
    if (!operation) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Datos de operacion no encontrados");
    }
    //Substract from customer balance
    client.balance = client.balance - amount;
    //Add last withdrawal amount
    client.lastAddAmount = amount;
    //Add date of operation
    const today = new Date();
    const todayDate = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    client.lastWithdrawDate = todayDate;
    //Add operation
    operation.userLosses += amount;
    operation.totalSumOfBalances = operation.totalSumOfBalances - amount;
    operation.dayTransactions++;
    !operation.creationDay
        ? (operation.creationDay = new Date().getDate())
        : null;
    //Save operation
    yield operation.save();
    //Save client
    yield client.save();
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Saldo actualizado exitosamente", client);
});
exports.substractFromClientBalance = substractFromClientBalance;
const searchClient = (userId, nameSearch) => __awaiter(void 0, void 0, void 0, function* () {
    //Find clients
    const clients = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .where("c.user = :userId", { userId })
        .andWhere("c.firstName ILIKE :nameSearch OR c.lastName ILIKE :nameSearch", {
        nameSearch: `%${nameSearch}%`,
    })
        .getMany();
    //Verify there are clients, otherwise returning error
    if (!clients) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Cliente/s no encontrado");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Cliente/s encontrado exitosamente", clients);
});
exports.searchClient = searchClient;
const deleteClient = (userId, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    //Find client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.clientId = :clientId", { clientId })
        .getOne();
    //Verify if client exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Cliente encontrado");
    }
    //Find operation
    const operation = yield db_1.AppDataSource
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
    //Verify if client and operation exists, otherwise returning error
    if (!operation) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Datos de operacion no encontrados");
    }
    //Add deleted client balance to the day's user losses
    operation.userLosses += client.balance;
    //Substract deleted client balance from the total sum of all balances
    operation.totalSumOfBalances = operation.totalSumOfBalances - client.balance;
    //Save operation data
    yield operation.save();
    //Save deleting client request
    yield Client_1.Client.delete({ clientId });
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, `El cliente ${client.firstName} fue eliminado exitosamente`, client);
});
exports.deleteClient = deleteClient;
const updateClient = (userId, clientId, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    //Verify if data exists, otherwise returning error
    if (!Object.keys(clientData).length) {
        return (0, response_handle_1.responseHandler)("Error", 404, "No hay datos para actualizar");
    }
    //Execute update query
    const updateClient = yield db_1.AppDataSource
        .createQueryBuilder()
        .update(Client_1.Client)
        .set(clientData)
        .where("user = :userId", { userId })
        .andWhere("clientId = :clientId", { clientId })
        .execute();
    //Find client
    const client = yield Client_1.Client.findOneBy({ clientId });
    //Verify if client exists, otherwise returning error
    if (!updateClient || !client) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Usuario no encontrado");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Cliente actualizado correctamente", client);
});
exports.updateClient = updateClient;

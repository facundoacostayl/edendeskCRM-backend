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
exports.updateClient = exports.deleteClient = exports.searchClient = exports.substractFromClientBalance = exports.addToClientBalance = exports.createClient = exports.getClients = exports.getClient = void 0;
const Client_1 = require("../config/entities/Client");
const User_1 = require("../config/entities/User");
const Operation_1 = require("../config/entities/Operation");
const response_handle_1 = require("../utils/response.handle");
const db_1 = require("../config/db/db");
const getClient = (userid, clientid) => __awaiter(void 0, void 0, void 0, function* () {
    //Find Client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userid", { userid })
        .andWhere("c.clientid = :clientid", { clientid })
        .getOne();
    //Verify if user exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client doesn't exist");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "Client found succesfully", client);
});
exports.getClient = getClient;
const getClients = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    //FIX userId x userid <---
    //Find clients
    const clientList = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userid", { userid })
        .getMany();
    //Verify if client list exists, otherwise returning error
    if (clientList.length <= 0) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client list not found");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "Client list found succesfully", clientList);
});
exports.getClients = getClients;
/*const getPaginationClientList = async (userid: ClientType["user"], page: number, size: number) => {

  //Set page number to index for multiplying it * the number of values setted in size.
  const pageIndex = page - 1;

  //Multiply pageIndex * the number of values setted in size.
  const numberOfValuesToSkip = size * pageIndex;

  //Find clients
  const clients = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userid", {userid})
    .orderBy("c.user", "DESC")
    .take(size)
    .skip(numberOfValuesToSkip)
    .getMany();

    //Verify if clients exists, otherwise returning error
    if(!clients) {
      return responseHandler('Error', 404, "Clients not found");
    };

    return responseHandler('Success', 200, "Clients found succesfully", clients);
};*/
const createClient = (nombre, apellido, telefono, userid) => __awaiter(void 0, void 0, void 0, function* () {
    //Request in order to check if client has already been added
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userid", { userid })
        .andWhere("c.telefono = :telefono", { telefono })
        .getOne();
    //Verify if client exists, otherwise returning error
    if (client) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client already exists");
    }
    //Create new client
    const newClient = new Client_1.Client();
    newClient.nombre = nombre;
    newClient.apellido = apellido;
    newClient.telefono = telefono;
    newClient.saldo = 0;
    newClient.fechaultcarga = "No especificado";
    newClient.montoultcarga = 0;
    newClient.fechaultretiro = "No especificado";
    newClient.montoultretiro = 0;
    newClient.tipodecarga = "No especificado";
    newClient.sucursal = "No especificado";
    newClient.user = userid;
    //Save client
    yield newClient.save();
    return (0, response_handle_1.responseHandler)("Success", 200, "Client added succesfully", newClient);
});
exports.createClient = createClient;
const addToClientBalance = (userId, clientid, amount) => __awaiter(void 0, void 0, void 0, function* () {
    //Find client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.clientid = :clientid", { clientid })
        .getOne();
    //Find operation
    const operation = yield Operation_1.Operation.findOneBy({
        userId,
        createdAt: new Date().getDate(),
    });
    //Verify if client and operation exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client not found");
    }
    //Add to customer balance
    client.saldo += amount;
    //Add date of operation
    const today = new Date();
    const todayDate = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    client.fechaultcarga = todayDate;
    client.montoultcarga = client.saldo;
    if (operation) {
        //Add operation
        operation.userGain += amount;
        operation.userTotalBalance += amount;
        operation.dayTransactions++;
        !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;
        //Save operation
        yield operation.save();
    }
    //Save client
    yield client.save();
    return (0, response_handle_1.responseHandler)("Success", 200, `Balance updated succesfully. Client ${client.nombre + " " + client.apellido} balance is $${client.saldo}`);
});
exports.addToClientBalance = addToClientBalance;
const substractFromClientBalance = (userId, clientid, amount) => __awaiter(void 0, void 0, void 0, function* () {
    //Find client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userId", { userId })
        .andWhere("c.clientid = :clientid", { clientid })
        .getOne();
    //Find operation
    const operation = yield Operation_1.Operation.findOneBy({
        userId,
        createdAt: new Date().getDate(),
    });
    //Verify if client and operation exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client not found");
    }
    //Substract from customer balance
    client.saldo = client.saldo - amount;
    //Add last withdrawal amount
    client.montoultretiro = amount;
    //Add date of operation
    const today = new Date();
    const todayDate = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    client.fechaultretiro = todayDate;
    if (operation) {
        //Add operation
        operation.userLost += amount;
        operation.userTotalBalance = operation.userTotalBalance - amount;
        operation.dayTransactions++;
        !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;
        //Save operation
        yield operation.save();
    }
    //Save client
    yield client.save();
    return (0, response_handle_1.responseHandler)("Success", 200, `Balance updated succesfully. Client ${client.nombre + " " + client.apellido} balance is $${client.saldo}`, client);
});
exports.substractFromClientBalance = substractFromClientBalance;
const searchClient = (userId, nameSearch) => __awaiter(void 0, void 0, void 0, function* () {
    //Find clients
    const clients = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .where("c.user = :userId", { userId })
        .andWhere("c.nombre ILIKE :nameSearch OR c.apellido ILIKE :nameSearch", {
        nameSearch: `%${nameSearch}%`,
    })
        .getMany();
    //Verify there are clients, otherwise returning error
    if (!clients) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client/s not found");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "Client/s found", clients);
});
exports.searchClient = searchClient;
const deleteClient = (userid, clientid) => __awaiter(void 0, void 0, void 0, function* () {
    //Find client
    const client = yield db_1.AppDataSource
        .getRepository(Client_1.Client)
        .createQueryBuilder("c")
        .innerJoinAndSelect(User_1.User, "u", "u.id = c.user")
        .where("c.user = :userid", { userid })
        .andWhere("c.clientid = :clientid", { clientid })
        .getOne();
    //Find operation
    const operation = yield Operation_1.Operation.findOneBy({
        userId: userid,
        createdAt: new Date().getDate(),
    });
    //Verify if client exists, otherwise returning error
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client not found");
    }
    //Save operation data
    if (operation) {
        operation.userLost += client.saldo;
        operation.userTotalBalance = operation.userTotalBalance - client.saldo;
        yield operation.save();
    }
    //Save deleting client request
    yield Client_1.Client.delete({ clientid });
    return (0, response_handle_1.responseHandler)("Success", 201, `Client ${client.nombre} deleted succesfully`);
});
exports.deleteClient = deleteClient;
const updateClient = (userid, clientid, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    //Execute update query
    const client = yield db_1.AppDataSource
        .createQueryBuilder()
        .update(Client_1.Client)
        .set(clientData)
        .where("user = :userid", { userid })
        .andWhere("clientid = :clientid", { clientid })
        .returning("")
        .execute();
    if (!client) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client not found");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "Client updated succesfully");
});
exports.updateClient = updateClient;

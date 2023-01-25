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
exports.substractFromClientBalance = exports.addToClientBalance = exports.createClient = exports.getClient = exports.getClients = void 0;
const Client_1 = require("../config/entities/Client");
const Operation_1 = require("../config/entities/Operation");
const response_handle_1 = require("../utils/response.handle");
const getClients = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //FIX userId x userid <---
    //Find clients
    const clientList = yield Client_1.Client.findBy({ userId });
    //Verify if client list exists, otherwise returning error
    if (clientList.length <= 0) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client list not found");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "Client list found succesfully", clientList);
});
exports.getClients = getClients;
const getClient = (clientid) => __awaiter(void 0, void 0, void 0, function* () {
    //Find Client
    const client = yield Client_1.Client.findOneBy({ clientid });
    //Verify if user exists, otherwise returning error
    if (client === null) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Client doesn't exist");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "Client found succesfully", client);
});
exports.getClient = getClient;
const createClient = (nombre, apellido, telefono, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if client has already been added
    const client = yield Client_1.Client.findOneBy({ telefono: telefono });
    if (client) {
        return (0, response_handle_1.responseHandler)('Error', 404, 'Client already exists');
    }
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
    newClient.userId = userId;
    yield newClient.save();
    return (0, response_handle_1.responseHandler)('Success', 200, 'Client added succesfully', newClient);
});
exports.createClient = createClient;
const addToClientBalance = (clientid, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield Client_1.Client.findOneBy({ clientid });
    const operation = yield Operation_1.Operation.findOneBy({
        userId
        //createdAt: new Date().getDate(),
    });
    if (!client || !operation) {
        return (0, response_handle_1.responseHandler)('Error', 404, "Client not found");
    }
    client.saldo += amount;
    const today = new Date();
    const todayDate = today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    client.fechaultcarga = todayDate;
    client.montoultcarga = client.saldo;
    operation.userGain += amount;
    operation.userTotalBalance += amount;
    operation.dayTransactions++;
    !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;
    yield client.save();
    yield operation.save();
    return (0, response_handle_1.responseHandler)('Success', 200, `Balance updated succesfully. Client ${client.nombre + " " + client.apellido} balance is $${client.saldo}`);
});
exports.addToClientBalance = addToClientBalance;
const substractFromClientBalance = (clientid, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield Client_1.Client.findOneBy({ clientid });
    const operation = yield Operation_1.Operation.findOneBy({
        userId,
        createdAt: new Date().getDate(),
    });
    if (!client || !operation) {
        return (0, response_handle_1.responseHandler)('Error', 404, "Client not found");
    }
    client.saldo = client.saldo - amount;
    client.montoultretiro = amount;
    const today = new Date();
    const todayDate = today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    client.fechaultretiro = todayDate;
    operation.userLost += amount;
    operation.userTotalBalance = operation.userTotalBalance - amount;
    operation.dayTransactions++;
    !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;
    yield client.save();
    yield operation.save();
    return (0, response_handle_1.responseHandler)('Success', 200, `Balance updated succesfully. Client ${client.nombre + " " + client.apellido} balance is $${client.saldo}`);
});
exports.substractFromClientBalance = substractFromClientBalance;

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
exports.updateItem = exports.deleteItem = exports.orderByClientBalanceDesc = exports.orderByClientBalanceAsc = exports.orderByClientNameDesc = exports.orderByClientNameAsc = exports.searchItem = exports.substractFromItemBalance = exports.addToItemBalance = exports.createItem = exports.getPaginationItemList = exports.getItems = exports.getItem = void 0;
const Client_1 = require("../config/entities/Client");
const client_service_1 = require("../services/client.service");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userid, clientid } = req.params;
        //Data request
        const response = yield (0, client_service_1.getClient)(parseInt(userid), parseInt(clientid));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.getItem = getItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userid } = req.params;
        //Data request
        const response = yield (0, client_service_1.getClients)(parseInt(userid));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.getItems = getItems;
const getPaginationItemList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userid } = req.params;
        //Require query (page number and limit of clients to be returned)
        const { page, size } = req.query;
        return (page + "" + size);
        //Data request
        /*const response = await getPaginationClientList(parseInt(userid), parseInt(page as string), parseInt(size as string));
    
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
          throw new Error(response.message);
        }*/
        return res.json();
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ error });
    }
});
exports.getPaginationItemList = getPaginationItemList;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require Body
        const { nombre, apellido, telefono, userId } = req.body;
        //Data request
        const response = yield (0, client_service_1.createClient)(nombre, apellido, telefono, userId);
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.createItem = createItem;
const addToItemBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userId, clientId } = req.params;
        //Req body
        const { amount } = req.body;
        //Data request
        const response = yield (0, client_service_1.addToClientBalance)(parseInt(userId), parseInt(clientId), parseInt(amount));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.addToItemBalance = addToItemBalance;
const substractFromItemBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req body
        const { amount } = req.body;
        //Req params
        const { userId, clientId } = req.params;
        //Data request
        const response = yield (0, client_service_1.substractFromClientBalance)(parseInt(userId), parseInt(clientId), parseInt(amount));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
});
exports.substractFromItemBalance = substractFromItemBalance;
const searchItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userid } = req.params;
        //Req query
        const { nameSearch } = req.query;
        //Early return if search input is empty.
        if (nameSearch.toString().length <= 0)
            return;
        //Data request
        const response = yield (0, client_service_1.searchClient)(parseInt(userid), nameSearch.toString());
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
});
exports.searchItem = searchItem;
const orderByClientNameAsc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clientsSorted = yield Client_1.Client.query('SELECT * FROM clients WHERE "userId" = $1 ORDER BY nombre ASC', [id]);
        return res.json(clientsSorted);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Server internal error");
    }
});
exports.orderByClientNameAsc = orderByClientNameAsc;
const orderByClientNameDesc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clients = yield Client_1.Client.query('SELECT * FROM clients WHERE "userId" = $1 ORDER BY nombre DESC', [id]);
        return res.json(clients);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Server internal error");
    }
});
exports.orderByClientNameDesc = orderByClientNameDesc;
const orderByClientBalanceAsc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clients = yield Client_1.Client.query('SELECT * FROM clients WHERE "userId" = $1 ORDER BY saldo ASC', [id]);
        return res.json(clients);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Server internal error");
    }
});
exports.orderByClientBalanceAsc = orderByClientBalanceAsc;
const orderByClientBalanceDesc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clients = yield Client_1.Client.query('SELECT * FROM clients WHERE "userId" = $1 ORDER BY saldo DESC', [id]);
        return res.json(clients);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Server internal error");
    }
});
exports.orderByClientBalanceDesc = orderByClientBalanceDesc;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userid, clientid } = req.params;
        //Data request
        const response = yield (0, client_service_1.deleteClient)(parseInt(userid), parseInt(clientid));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json(error.message);
    }
});
exports.deleteItem = deleteItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userid, clientid } = req.params;
        //Req body
        const { body } = req;
        //Data request
        const response = yield (0, client_service_1.updateClient)(parseInt(userid), parseInt(clientid), body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.error(error);
        error instanceof Error && res.status(500).json("Internal server error");
    }
});
exports.updateItem = updateItem;

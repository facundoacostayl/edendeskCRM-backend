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
exports.getClientsQuantity = exports.updateClient = exports.deleteClient = exports.orderByClientBalanceDesc = exports.orderByClientBalanceAsc = exports.orderByClientNameDesc = exports.orderByClientNameAsc = exports.searchClient = exports.substractFromItemBalance = exports.addToItemBalance = exports.createItem = exports.getItem = exports.getItems = void 0;
const Client_1 = require("../config/entities/Client");
const Operation_1 = require("../config/entities/Operation");
const client_service_1 = require("../services/client.service");
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { id } = req.params;
        //Data request
        const clientList = yield (0, client_service_1.getClients)(parseInt(id));
        //Checking if data type is "Error", otherwise throwing error
        if (clientList.responseType === "Error") {
            throw new Error(clientList.message);
        }
        return res.json(clientList);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.getItems = getItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { id } = req.params;
        //Data request
        const client = yield (0, client_service_1.getClient)(parseInt(id));
        //Checking if data type is "Error", otherwise throwing error
        if (client.responseType === "Error") {
            throw new Error(client.message);
        }
        return res.json(client);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.getItem = getItem;
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
        return res.status(200).json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});
exports.addToItemBalance = addToItemBalance;
const substractFromItemBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const { userId, clientId } = req.params;
        const response = yield (0, client_service_1.substractFromClientBalance)(parseInt(userId), parseInt(clientId), parseInt(amount));
        if (response.responseType === "Error") {
            throw new Error(response.message);
        }
        return res.status(200).json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
});
exports.substractFromItemBalance = substractFromItemBalance;
const searchClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.query;
        const clients = yield Client_1.Client.query("SELECT * FROM clients WHERE \"userId\" = $1 AND nombre || ' ' || apellido ILIKE $2", [id, `%${name}%`]);
        return res.json(clients);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Server internal error");
    }
});
exports.searchClient = searchClient;
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
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, clientId } = req.params;
    const client = yield Client_1.Client.findOneBy({ clientid: parseInt(clientId) });
    const operation = yield Operation_1.Operation.findOneBy({
        userId: parseInt(userId),
        createdAt: new Date().getDate(),
    });
    if (!client || !operation)
        return res.status(403).json({ message: "Client not found" });
    operation.userLost += client.saldo;
    operation.userTotalBalance = operation.userTotalBalance - client.saldo;
    yield operation.save();
    yield Client_1.Client.delete({ clientid: parseInt(clientId) });
    return res.status(200).json({ message: "Client deleted successfully" });
});
exports.deleteClient = deleteClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const queryBuilder = () => {
            if (Object.keys(body).length === 0)
                return null;
            let query = `UPDATE clients SET `;
            query += Object.keys(body)
                .map((key) => {
                const valueToSet = typeof body[key] === "string"
                    ? `'${body[key]}'`
                    : parseInt(body[key]);
                return `${key}=${valueToSet}`;
            })
                .join(", ");
            return query + ` WHERE clientid=${id};`;
        };
        yield Client_1.Client.query(queryBuilder());
        const client = yield Client_1.Client.findOneBy({ clientid: parseInt(id) });
        return res.json(client);
    }
    catch (error) {
        console.error(error);
        error instanceof Error && res.status(500).json("Internal server error");
    }
});
exports.updateClient = updateClient;
const getClientsQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const client = yield Client_1.Client.findBy({ userId: parseInt(userId) });
        const clientLength = client.length;
        return res.json(clientLength);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Internal server error");
    }
});
exports.getClientsQuantity = getClientsQuantity;

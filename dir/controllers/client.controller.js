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
exports.updateItem = exports.deleteItem = exports.searchItem = exports.substractFromItemBalance = exports.addToItemBalance = exports.createItem = exports.getItem = exports.getPaginationItemList = exports.getItems = void 0;
const client_service_1 = require("../services/client.service");
const error_handle_1 = require("../utils/error.handle");
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Data request
        const response = yield (0, client_service_1.getClients)(parseInt(userId));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
    }
});
exports.getItems = getItems;
const getPaginationItemList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Require query (page number and limit of clients to be returned)
        const { page, size, sortBy, orderBy } = req.query;
        //Data request
        const response = yield (0, client_service_1.getPaginationClientList)(parseInt(userId), parseInt(page), parseInt(size), sortBy, orderBy);
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
    }
});
exports.getPaginationItemList = getPaginationItemList;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId, clientId } = req.params;
        //Data request
        const response = yield (0, client_service_1.getClient)(parseInt(userId), parseInt(clientId));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
    }
});
exports.getItem = getItem;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Require Body
        const { firstName, lastName, tel } = req.body;
        //Data request
        const response = yield (0, client_service_1.createClient)(firstName, lastName, tel, parseInt(userId));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
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
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
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
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
    }
});
exports.substractFromItemBalance = substractFromItemBalance;
const searchItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userId } = req.params;
        //Req query
        const { nameSearch } = req.query;
        //Early return if search input is empty.
        if (!nameSearch || nameSearch.toString().length <= 0)
            return;
        //Data request
        const response = yield (0, client_service_1.searchClient)(parseInt(userId), nameSearch.toString());
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
    }
});
exports.searchItem = searchItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userId, clientId } = req.params;
        //Data request
        const response = yield (0, client_service_1.deleteClient)(parseInt(userId), parseInt(clientId));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json({ message: error.message });
    }
});
exports.deleteItem = deleteItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req params
        const { userId, clientId } = req.params;
        //Req body
        const { body } = req;
        //Data request
        const response = yield (0, client_service_1.updateClient)(parseInt(userId), parseInt(clientId), body);
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.error(error);
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).json("Internal server error");
    }
});
exports.updateItem = updateItem;

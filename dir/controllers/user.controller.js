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
exports.authorizeToken = exports.updateItem = exports.loginItem = exports.createItem = exports.getItem = void 0;
const user_service_1 = require("../services/user.service");
const error_handle_1 = require("../utils/error.handle");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Data request
        const response = yield (0, user_service_1.getUser)(parseInt(userId));
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
        //Require body
        const { firstName, loginEmail, password } = req.body;
        //Data request
        const response = yield (0, user_service_1.createUser)(firstName, loginEmail, password);
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            error instanceof error_handle_1.ErrorWithStatus &&
                res.status(error.statusCode).json({ message: error.message });
        }
    }
});
exports.createItem = createItem;
const loginItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require body
        const { loginEmail, password } = req.body;
        //Data request
        const response = yield (0, user_service_1.loginUser)(loginEmail, password);
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            error instanceof error_handle_1.ErrorWithStatus &&
                res.status(error.statusCode).json({ message: error.message });
        }
    }
});
exports.loginItem = loginItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params and body
        const { userId } = req.params;
        const { body } = req;
        //Data request
        const response = yield (0, user_service_1.updateUser)(parseInt(userId), body);
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
exports.updateItem = updateItem;
const authorizeToken = (req, res) => {
    try {
        res.json(true);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.authorizeToken = authorizeToken;

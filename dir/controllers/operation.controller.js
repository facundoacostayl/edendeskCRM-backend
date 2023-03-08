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
exports.getFullItemBalance = exports.getMonthItemData = exports.getTodayItemData = exports.getFullItemData = void 0;
const operation_service_1 = require("../services/operation.service");
const error_handle_1 = require("../utils/error.handle");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const getFullItemData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Data request
        const response = yield (0, operation_service_1.getFullOperationData)(parseInt(userId));
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
exports.getFullItemData = getFullItemData;
const getTodayItemData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Data request
        const response = yield (0, operation_service_1.getTodayOperationData)(parseInt(userId));
        //Checking if data exists and returning success response
        if (response) {
            return res.status(response.statusCode).json(response);
        }
    }
    catch (error) {
        error instanceof Error &&
            res.status(httpStatusCodes_1.httpStatusCodes.INTERNAL_SERVER).send("Server internal error");
    }
});
exports.getTodayItemData = getTodayItemData;
const getMonthItemData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Require body
        const { creationMonth, creationYear } = req.params;
        //Data request
        const response = yield (0, operation_service_1.getMonthOperationData)(parseInt(userId), parseInt(creationMonth), parseInt(creationYear));
        //Checking if data type is "Error", otherwise throwing error
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        error instanceof error_handle_1.ErrorWithStatus &&
            res.status(error.statusCode).send({ message: error.message });
    }
});
exports.getMonthItemData = getMonthItemData;
const getFullItemBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require params
        const { userId } = req.params;
        //Data request
        const response = yield (0, operation_service_1.getSumOfAllBalances)(parseInt(userId));
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
exports.getFullItemBalance = getFullItemBalance;

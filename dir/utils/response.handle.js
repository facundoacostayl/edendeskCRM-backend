"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (type, statusCode, message, data, token) => {
    const response = { responseType: type, statusCode, message, data, token };
    return response;
};
exports.responseHandler = responseHandler;

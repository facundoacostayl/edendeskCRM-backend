"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (res, message, status) => {
    res.status(status);
    res.send({ error: message });
};
exports.errorHandler = errorHandler;

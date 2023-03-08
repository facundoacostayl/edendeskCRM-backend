"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const response_handle_1 = require("../utils/response.handle");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const getDashboard = (userId, userRole) => {
    if (!userId || !userRole) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.INTERNAL_SERVER, "Internal server error");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, `Bienvenido usuario con id: ${userId}. Tu rol es: ${userRole}`);
};
exports.getDashboard = getDashboard;

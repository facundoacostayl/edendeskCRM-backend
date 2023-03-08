"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const error_handle_1 = require("../utils/error.handle");
const getItem = (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;
        const userRole = user.role;
        const response = (0, dashboard_service_1.getDashboard)(userId, userRole);
        if (response.responseType === "Error") {
            (0, error_handle_1.throwErrorWithStatus)(response);
        }
        return res.status(response.statusCode).send(response.message);
    }
    catch (error) {
        if (error instanceof error_handle_1.ErrorWithStatus) {
            console.error(error.message);
            res.status(error.statusCode).json(error.message);
        }
    }
};
exports.getItem = getItem;

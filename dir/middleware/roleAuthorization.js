"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRole = void 0;
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const userRoles_1 = require("../utils/userRoles");
const authRole = (req, res, next) => {
    try {
        //Req user data from req.user
        const user = req.user;
        //Verify if the role of the user is "admin", otherwise returning error
        if (user.role !== userRoles_1.ROLE.ADMIN) {
            throw new Error("Acceso denegado. Contacta a un administrador");
        }
        next();
    }
    catch (error) {
        error instanceof Error &&
            res.status(httpStatusCodes_1.httpStatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
};
exports.authRole = authRole;

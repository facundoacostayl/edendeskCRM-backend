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
exports.authJwt = void 0;
const jwt_handle_1 = require("../utils/jwt.handle");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const authJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Req token from headers
        const token = req.headers.token;
        //Split "Bearer" from token
        const jwt = token && token.split(" ").pop();
        //Verify if required jwt exists, otherwise returning error
        if (!jwt) {
            return res.status(httpStatusCodes_1.httpStatusCodes.FORBIDDEN).json("JWT not found");
        }
        //Verify required jwt and get data
        const isVerified = (0, jwt_handle_1.jwtVerify)(jwt);
        //Verify if required jwt is a valid JWT token, otherwise returning error
        if (!isVerified) {
            return res.status(httpStatusCodes_1.httpStatusCodes.FORBIDDEN).send("JWT is not valid");
        }
        //Attach isVerified data to req.user
        req.user = isVerified;
        if (isVerified) {
            console.log(isVerified);
            next();
        }
        else {
            return res.status(httpStatusCodes_1.httpStatusCodes.FORBIDDEN).send("req.user not found");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(httpStatusCodes_1.httpStatusCodes.INTERNAL_SERVER).json(false);
        }
    }
});
exports.authJwt = authJwt;

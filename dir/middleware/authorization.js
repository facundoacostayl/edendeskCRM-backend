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
const jwtoken = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("token");
        if (!token) {
            return res.status(403).json(false);
        }
        const payload = jwtoken.verify(token, process.env.JWT_SECRET);
        req.user = payload.user;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(403).json(false);
        }
    }
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const DB_HOST = process.env.PROD_DB_HOST || process.env.DEV_DB_HOST;
exports.DB_HOST = DB_HOST;
const DB_USER = process.env.PROD_DB_USERNAME || process.env.DEV_DB_USERNAME;
exports.DB_USER = DB_USER;
const DB_PASSWORD = process.env.PROD_DB_PASSWORD || process.env.DEV_DB_PASSWORD;
exports.DB_PASSWORD = DB_PASSWORD;
const DB_NAME = process.env.PROD_DB_NAME || process.env.DEV_DB_DATABASE;
exports.DB_NAME = DB_NAME;
const DB_PORT = process.env.PROD_DB_PORT || process.env.DEV_DB_PORT;
exports.DB_PORT = DB_PORT;

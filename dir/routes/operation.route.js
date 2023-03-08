"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const operation_controller_1 = require("../controllers/operation.controller");
/**
 * @openapi
 * /operation/user{:userId}/today-operation-data:
 *    get:
 *      tags:
 *        - operations
 *      summary: "Get today's operations data"
 *      description: This endpoint get today's user's operation data
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/operation"
 * */
router.get("/user:userId/today-operation-data", operation_controller_1.getTodayItemData);
/**
 * @openapi
 * /operation/user{:userId}/total-operation-data:
 *    get:
 *      tags:
 *        - operations
 *      summary: "Get all operations data"
 *      description: This endpoint get all user's operation data
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/operation"
 * */
router.get("/user:userId/total-operation-data", operation_controller_1.getFullItemData);
/**
 * @openapi
 * /operation/user{:userId}/month{:creationMonth}/year{:creationYear}/month-operation}:
 *    get:
 *      tags:
 *        - operations
 *      summary: "Get month operations data"
 *      description: This endpoint get specified month's user's operation data
 *      parameters:
 *      - in: path
 *        name: userId, creationMonth, creationYear
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/operation"
 * */
router.get("/user:userId/month:month/year:year/month-operation", operation_controller_1.getMonthItemData);
/**
 * @openapi
 * /operation/user{:userId}/user-total-balance:
 *    get:
 *      tags:
 *        - operations
 *      summary: "Get all operations data"
 *      description: This endpoint get the sum of all balances of a specified user's client list
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/operation"
 * */
router.get("/user:userId/user-total-balance", operation_controller_1.getFullItemBalance);

import { Router } from "express";
import {
  getTodayItemData,
  getFullItemData,
  getMonthItemData,
  getFullClientBalance,
} from "../controllers/operation.controller";

const router = Router();

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
router.get("/user:userId/today-operation-data", getTodayItemData);

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
router.get("/user:userId/total-operation-data", getFullItemData);

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
router.get("/user:userId/month:month/year:year/month-operation", getMonthItemData);

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
router.get("/user:userId/user-total-balance", getFullClientBalance);

export { router };

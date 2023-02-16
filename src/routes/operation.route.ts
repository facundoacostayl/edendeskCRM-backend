import { Router } from "express";
const router = Router();
import {
  getTodayItemData,
  getFullItemData,
  getMonthItemData,
  getFullClientBalance,
} from "../controllers/operation.controller";
import { authRole } from "../middleware/roleAuthorization";

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
router.get("/user:userId/today-operation-data", authRole, getTodayItemData);

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
router.get("/user:userId/total-operation-data", authRole, getFullItemData);

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
router.get(
  "/user:userId/month:month/year:year/month-operation",
  authRole,
  getMonthItemData
);

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
router.get("/user:userId/user-total-balance", authRole, getFullClientBalance);

export { router };

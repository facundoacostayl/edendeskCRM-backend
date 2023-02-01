import { Router } from "express";
const router = Router();
import {
  createItem,
  loginItem,
  authorizeToken,
  getItem,
  updateItem,
} from "../controllers/user.controller";
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

/**
 * @openapi
 * /users/registro:
 *    post:
 *      tags:
 *        - users
 *      summary: "Register User"
 *      description: This endpoint validates body info, creates a new user and returns its data
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.post("/registro", validInfo, createItem);

/**
 * @openapi
 * /users/login:
 *    post:
 *      tags:
 *        - users
 *      summary: "Login User"
 *      description: This endpoint validates user info, log into its account and returns its data
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.post("/login", validInfo, loginItem);

/**
 * @openapi
 * /users/verificar:
 *    get:
 *      tags:
 *        - users
 *      summary: "Verify JWT"
 *      description: This endpoint validates JWT
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.get("/verificar", authorization, authorizeToken);

/**
 * @openapi
 * /users/{:userid}:
 *    get:
 *      tags:
 *        - users
 *      summary: "Get User Info"
 *      description: This endpoint finds a user and returns its information
 *      parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.get("/:userid", getItem);

/**
 * @openapi
 * /users/{:userid}:
 *    patch:
 *      tags:
 *        - users
 *      summary: "Update User Info"
 *      description: This endpoint finds a user, updates its information and returns it
 *      parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.put("/:userid", updateItem);

export { router };

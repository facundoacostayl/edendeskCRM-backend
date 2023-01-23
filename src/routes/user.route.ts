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
 * /user/registro:
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
 * /user/login:
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
 * /user/verificar:
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
 * /user/{:id}:
 *    get:
 *      tags:
 *        - users
 *      summary: "Get User Info"
 *      description: This endpoint finds a user and returns its information
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.get("/:id", getItem);

/**
 * @openapi
 * /user/{:id}:
 *    patch:
 *      tags:
 *        - users
 *      summary: "Update User Info"
 *      description: This endpoint finds a user, updates its information and returns it
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.patch("/:id", updateItem);

export { router };

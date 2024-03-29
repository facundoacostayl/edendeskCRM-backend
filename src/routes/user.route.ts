import { Router } from "express";
import {
  createItem,
  loginItem,
  authorizeToken,
  getItem,
  updateItem,
} from "../controllers/user.controller";
const router = Router();
import {
  validAuthUserInfo,
  validUpdateUserInfo,
} from "../middleware/userDataValidation";
import { authJwt } from "../middleware/jwtAuthorization";

/**
 * @openapi
 * /user/register:
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
router.post("/register", validAuthUserInfo, createItem);

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
router.post("/login", validAuthUserInfo, loginItem);

/**
 * @openapi
 * /user/verify:
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
router.get("/verify", authJwt, authorizeToken);

/**
 * @openapi
 * /user/{:userId}:
 *    get:
 *      tags:
 *        - users
 *      summary: "Get User Info"
 *      description: This endpoint finds a user and returns its information
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.get("/:userId", getItem);

/**
 * @openapi
 * /user/{:userId}:
 *    put:
 *      tags:
 *        - users
 *      summary: "Update User Info"
 *      description: This endpoint finds a user, updates its information and returns it
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 * */
router.put("/:userId", validUpdateUserInfo, updateItem);

export { router };

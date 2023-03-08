"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
exports.router = router;
const userDataValidation_1 = require("../middleware/userDataValidation");
const jwtAuthorization_1 = require("../middleware/jwtAuthorization");
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
router.post("/register", userDataValidation_1.validAuthUserInfo, user_controller_1.createItem);
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
router.post("/login", userDataValidation_1.validAuthUserInfo, user_controller_1.loginItem);
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
router.get("/verify", jwtAuthorization_1.authJwt, user_controller_1.authorizeToken);
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
router.get("/:userId", user_controller_1.getItem);
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
router.put("/:userId", userDataValidation_1.validUpdateUserInfo, user_controller_1.updateItem);

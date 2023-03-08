"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const client_controller_1 = require("../controllers/client.controller");
const clientDataValidation_1 = require("../middleware/clientDataValidation");
const roleAuthorization_1 = require("../middleware/roleAuthorization");
const jwtAuthorization_1 = require("../middleware/jwtAuthorization");
/**
 * @openapi
 * /client/user{:userId}/all-clients:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get a list of all clients"
 *      description: This endpoint finds all clients of a certain user found by its "id" sended in the url params and returns its information
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userId/all-clients", client_controller_1.getItems);
/**
 * @openapi
 * /client/user{:userId}/listed-clients:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get a limited list of clients"
 *      description: This endpoint finds a limited list of clients of a certain user found by its "id" sended in the url params and returns its information. Limit info is sended in the url query params.
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userId/listed-clients", client_controller_1.getPaginationItemList);
/**
 * @openapi
 * /client/user{:userId}/client{:clientId}":
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get client information"
 *      description: This endpoint finds a client and returns its information
 *      parameters:
 *      - in: path
 *        name: userId, clientId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userId/client:clientId", client_controller_1.getItem);
/**
 * @openapi
 * /client/user{:userId}/new-client":
 *    post:
 *      tags:
 *        - clients
 *      summary: "Create a new client"
 *      description: This endpoint creates a new client
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.post("/user:userId/new-client", clientDataValidation_1.validNewClientInfo, client_controller_1.createItem);
/**
 * @openapi
 * /client/user{:userId}/client{:clientId}":
 *    delete:
 *      tags:
 *        - clients
 *      summary: "Delete a client"
 *      description: This endpoint deletes a client
 *      parameters:
 *      - in: path
 *        name: userId, clientId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.delete("/user:userId/client:clientId", jwtAuthorization_1.authJwt, roleAuthorization_1.authRole, client_controller_1.deleteItem);
/**
 * @openapi
 * /client/user{:userId}/client{:clientId}":
 *    put:
 *      tags:
 *        - clients
 *      summary: "Update a new client"
 *      description: This endpoint updates a client
 *      parameters:
 *      - in: path
 *        name: userId, clientId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.put("/user:userId/client:clientId", clientDataValidation_1.validUpdateClientInfo, client_controller_1.updateItem);
/**
 * @openapi
 * /client/user{:userId}/client{:clientId}/add-balance":
 *    put:
 *      tags:
 *        - clients
 *      summary: "Add funds to a client balance"
 *      description: This endpoint finds a client and updates it's balance increasing it.
 *      parameters:
 *      - in: path
 *        name: userId, clientId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.put("/user:userId/client:clientId/add-balance", client_controller_1.addToItemBalance);
/**
 * @openapi
 * /client/user{:userId}/client{:clientId}/deduct-balance":
 *    put:
 *      tags:
 *        - clients
 *      summary: "Deduct funds to a client balance"
 *      description: This endpoint finds a client and updates it's balance deducting it.
 *      parameters:
 *      - in: path
 *        name: userId, clientId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.put("/user:userId/client:clientId/deduct-balance", client_controller_1.substractFromItemBalance);
/**
 * @openapi
 * /client/user{:userId}/search-client":
 *    get:
 *      tags:
 *        - clients
 *      summary: "Search a client"
 *      description: This endpoint search a client using data sended from the url query parameter..
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userId/search-client", client_controller_1.searchItem);

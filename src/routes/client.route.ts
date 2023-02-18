import { Router } from "express";
const router = Router();
import {
  getItems,
  getPaginationItemList,
  getItem,
  createItem,
  deleteItem,
  updateItem,
  addToItemBalance,
  substractFromItemBalance,
  searchItem,
} from "../controllers/client.controller";

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
router.get("/user:userId/all-clients", getItems);

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
router.get("/user:userId/listed-clients", getPaginationItemList);

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
router.get("/user:userId/client:clientId", getItem);

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
router.post("/user:userId/new-client", createItem);

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
router.delete("/user:userId/client:clientId", deleteItem);

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
router.put("/user:userId/client:clientId", updateItem);

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
router.put("/user:userId/client:clientId/add-balance", addToItemBalance);

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
router.put(
  "/user:userId/client:clientId/deduct-balance",
  substractFromItemBalance
);

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
router.get("/user:userId/search-client", searchItem);

export { router };

import Router from "express";
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
const authorization = require("../middleware/authorization");

/**
 * @openapi
 * /clients/user{:userid}/all-clients:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get a list of all clients"
 *      description: This endpoint finds all clients of a certain user found by its "id" sended in the url params and returns its information
 *      parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userid/all-clients", getItems);

/**
 * @openapi
 * /clients/user{:userid}/listed-clients:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get a limited list of clients"
 *      description: This endpoint finds a limited list of clients of a certain user found by its "id" sended in the url params and returns its information. Limit info is sended in the url query params.
 *      parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userid/listed-clients", getPaginationItemList);

/**
 * @openapi
 * /clients/user{:userid}/client{:clientid}":
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get client information"
 *      description: This endpoint finds a client and returns its information
 *      parameters:
 *      - in: path
 *        name: userid, clientid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userid/client:clientid", getItem);

/**
 * @openapi
 * /clients/user{:userid}/new-client":
 *    post:
 *      tags:
 *        - clients
 *      summary: "Create a new client"
 *      description: This endpoint creates a new client
 *      parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.post("/user:userid/new-client", createItem);

/**
 * @openapi
 * /clients/user{:userid}/client{:clientid}":
 *    delete:
 *      tags:
 *        - clients
 *      summary: "Delete a client"
 *      description: This endpoint deletes a client
 *      parameters:
 *      - in: path
 *        name: userid, clientid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.delete("/user:userid/client:clientid", deleteItem);

/**
 * @openapi
 * /clients/user{:userid}/client{:clientid}":
 *    put:
 *      tags:
 *        - clients
 *      summary: "Update a new client"
 *      description: This endpoint updates a client
 *      parameters:
 *      - in: path
 *        name: userid, clientid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.put("/user:userid/client:clientid", updateItem);

/**
 * @openapi
 * /clients/user{:userid}/client{:clientid}/add-balance":
 *    put:
 *      tags:
 *        - clients
 *      summary: "Add funds to a client balance"
 *      description: This endpoint finds a client and updates it's balance increasing it.
 *      parameters:
 *      - in: path
 *        name: userid, clientid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.put("/user:userid/client:clientid/add-balance", addToItemBalance);

/**
 * @openapi
 * /clients/user{:userid}/client{:clientid}/deduct-balance":
 *    put:
 *      tags:
 *        - clients
 *      summary: "Deduct funds to a client balance"
 *      description: This endpoint finds a client and updates it's balance deducting it.
 *      parameters:
 *      - in: path
 *        name: userid, clientid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.put("/user:userid/client:clientid/deduct-balance", substractFromItemBalance);

/**
 * @openapi
 * /clients/user{:userid}/search-client":
 *    get:
 *      tags:
 *        - clients
 *      summary: "Search a client"
 *      description: This endpoint search a client using data sended from the url query parameter..
 *      parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/client"
 * */
router.get("/user:userid/search-client", searchItem);

export {router};

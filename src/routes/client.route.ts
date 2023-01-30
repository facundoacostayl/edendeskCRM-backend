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

router.get("/user:userid/clients", getItems);
router.get("/user:userid/client-list", getPaginationItemList);
router.get("/user:userid/client:clientid", getItem);
router.post("/nuevo-cliente", createItem);
router.delete("/user:userid/cliente:clientid", deleteItem);
router.put("/user:userid/client:clientid", updateItem);
router.put("/user:userid/cliente:clientid/agregar-saldo", addToItemBalance);
router.put("/user:userid/cliente:clientid/descontar-saldo", substractFromItemBalance);
router.get("/user:userid/buscar-cliente", searchItem);

export {router};

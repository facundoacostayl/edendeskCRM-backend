import Router from "express";
const router = Router();
import {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateClient,
  addToItemBalance,
  substractFromItemBalance,
  searchItem,
  orderByClientNameAsc,
  orderByClientNameDesc,
  orderByClientBalanceAsc,
  orderByClientBalanceDesc,
  getClientsQuantity
} from "../controllers/client.controller";
const authorization = require("../middleware/authorization");

router.get("/user:userid/clientes", getItems);
router.get("/user:userid/client:clientid", getItem);
router.post("/nuevo-cliente", createItem);
router.delete("/user:userid/cliente:clientid", deleteItem);
router.post("/:id", updateClient);
router.put("/user:userId/cliente:clientId/agregar-saldo", addToItemBalance);
router.put("/user:userId/cliente:clientId/descontar-saldo", substractFromItemBalance);
router.get("/user:userid/buscar-cliente", searchItem);
router.get("/user:id/clientes/ordenar-por-nombre-asc", orderByClientNameAsc);
router.get("/user:id/clientes/ordenar-por-nombre-desc", orderByClientNameDesc);
router.get("/user:id/clientes/ordenar-por-saldo-asc", orderByClientBalanceAsc);
router.get("/user:id/clientes/ordenar-por-saldo-desc", orderByClientBalanceDesc);
router.get("/user:userId/clientes/cantidad-clientes", getClientsQuantity)

export {router};

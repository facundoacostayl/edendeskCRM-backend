import Router from "express";
const router = Router();
import {
  getClients,
  getClient,
  addClient,
  deleteClient,
  updateClient,
  addToClientBalance,
  substractFromClientBalance,
  searchClient,
  orderByClientNameAsc,
  orderByClientNameDesc,
  orderByClientBalanceAsc,
  orderByClientBalanceDesc,
  getClientsQuantity
} from "../controllers/client.controllers";
const authorization = require("../middleware/authorization");

router.get("/user:id/clientes", getClients);
router.get("/cliente/:id", getClient);
router.post("/nuevo-cliente", addClient);
router.delete("/user:userId/cliente:clientId", deleteClient);
router.patch("/cliente/:id", updateClient);
router.put("/user:userId/cliente:clientId/agregar-saldo", addToClientBalance);
router.put("/user:userId/cliente:clientId/descontar-saldo", substractFromClientBalance);
router.get("/user:id/buscar-cliente", searchClient);
router.get("/user:id/clientes/ordenar-por-nombre-asc", orderByClientNameAsc);
router.get("/user:id/clientes/ordenar-por-nombre-desc", orderByClientNameDesc);
router.get("/user:id/clientes/ordenar-por-saldo-asc", orderByClientBalanceAsc);
router.get("/user:id/clientes/ordenar-por-saldo-desc", orderByClientBalanceDesc);
router.get("/user:userId/clientes/cantidad-clientes", getClientsQuantity)

export default router;

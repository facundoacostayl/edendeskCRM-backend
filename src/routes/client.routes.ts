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
  getFullClientBalance,
} from "../controllers/client.controllers";
const authorization = require("../middleware/authorization");

router.get("/user:id/clientes", getClients);
router.get("/cliente/:id", getClient);
router.post("/nuevo-cliente", addClient);
router.delete("/cliente/:id", deleteClient);
router.patch("/cliente/:id", updateClient);
router.put("/user:userId/cliente:clientId/agregar-saldo", addToClientBalance);
router.put("/cliente/:id/descontar-saldo", substractFromClientBalance);
router.get("/user:id/buscar-cliente", searchClient);
router.get("/cliente/ordenar-por-nombre-asc", orderByClientNameAsc);
router.get("/cliente/ordenar-por-nombre-desc", orderByClientNameDesc);
router.get("/cliente/ordenar-por-saldo-asc", orderByClientBalanceAsc);
router.get("/cliente/ordenar-por-saldo-desc", orderByClientBalanceDesc);
router.get("/user:id/clientes/saldo-total", getFullClientBalance);

export default router;

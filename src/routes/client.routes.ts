import Router from "express";
const router = Router();
import {
  getClients,
  getClient,
  addClient,
  deleteClient,
  addToClientBalance,
  substractFromClientBalance,
  searchClient,
  orderByClientNameAsc,
  orderByClientNameDesc,
  orderByClientBalanceAsc,
  orderByClientBalanceDesc,
} from "../controllers/client.controllers";
const authorization = require("../middleware/authorization");

router.get("/clientes", getClients);
router.get("/cliente/:id", getClient)
router.post("/nuevo-cliente", addClient);
router.delete("/cliente/:id", deleteClient);
router.put("/cliente/:id/agregar-saldo", addToClientBalance);
router.put("/cliente/:id/descontar-saldo", substractFromClientBalance);
router.get("/cliente", searchClient);
router.get("/cliente/ordenar-por-nombre-asc", orderByClientNameAsc);
router.get("/cliente/ordenar-por-nombre-desc", orderByClientNameDesc);
router.get("/cliente/ordenar-por-saldo-asc", orderByClientBalanceAsc);
router.get("/cliente/ordenar-por-saldo-desc", orderByClientBalanceDesc);

export default router;

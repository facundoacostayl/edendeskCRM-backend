import Router from 'express';
const router = Router();
import {getClients, addClient, addToClientBalance, substractFromClientBalance, searchClient} from '../controllers/client.controllers';
const authorization = require("../middleware/authorization");

router.get("/clientes", getClients);
router.post("/nuevo-cliente", addClient);
router.put("/cliente/:id/agregar-saldo", addToClientBalance);
router.put("/cliente/:id/descontar-saldo", substractFromClientBalance);
router.get("/cliente", searchClient)

export default router;
import Router from 'express';
const router = Router();
import {addClient, updateClientBalance} from '../controllers/client.controllers';
const authorization = require("../middleware/authorization");

router.post("/nuevo-cliente", addClient);
router.put("/cliente/:id/nuevo-saldo", updateClientBalance)

export default router;
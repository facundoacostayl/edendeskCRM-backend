import Router from 'express';
const router = Router();
import {addClient} from '../controllers/client.controllers';
const authorization = require("../middleware/authorization");

router.post("/nuevo-cliente", addClient);

export default router;
import Router from 'express';
const router = Router();
import {addClient} from '../controllers/client.controllers';
const authorization = require("../middleware/authorization");

router.post("/añadir-cliente", authorization, addClient);

export default router;
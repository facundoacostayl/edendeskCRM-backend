import {Router} from 'express';
import {getOperationData, getFullClientBalance} from '../controllers/operation.controllers';

const router = Router();

router.get("/user:id/operation", getOperationData);
router.get("/user:id/clientes/saldo-total", getFullClientBalance);

export default router;
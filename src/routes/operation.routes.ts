import {Router} from 'express';
import {getTodayOperationData, getFullClientBalance} from '../controllers/operation.controllers';

const router = Router();

router.get("/user:id/operation", getTodayOperationData);
router.get("/user:id/clientes/saldo-total", getFullClientBalance);

export default router;
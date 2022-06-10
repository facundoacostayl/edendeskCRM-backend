import {Router} from 'express';
import {getTodayOperationData, getFullOperationData, getMonthOperationData, getFullClientBalance} from '../controllers/operation.controllers';

const router = Router();

router.get("/user:id/operation", getTodayOperationData);
router.get("/user:id/total-operation", getFullOperationData)
router.post("/user:id/month-operation", getMonthOperationData);
router.get("/user:id/clientes/saldo-total", getFullClientBalance);

export default router;
import {Router} from 'express';
import {getTodayOperationData, getFullItemData, getMonthOperationData, getFullClientBalance} from '../controllers/operation.controller';

const router = Router();

router.get("/user:userid/operation", getTodayOperationData);
router.get("/user:id/total-operation", getFullItemData)
router.post("/user:id/month-operation", getMonthOperationData);
router.get("/user:id/clientes/saldo-total", getFullClientBalance);

export {router};
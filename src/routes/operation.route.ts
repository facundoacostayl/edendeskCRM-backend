import {Router} from 'express';
import {getTodayItemData, getFullItemData, getMonthItemData, getFullClientBalance} from '../controllers/operation.controller';

const router = Router();

router.get("/user:userid/operation", getTodayItemData);
router.get("/user:id/total-operation", getFullItemData)
router.post("/user:id/month-operation", getMonthItemData);
router.get("/user:id/clientes/saldo-total", getFullClientBalance);

export {router};
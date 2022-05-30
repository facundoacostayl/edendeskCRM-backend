import {Router} from 'express';
import {getOperationData} from '../controllers/operation.controllers';

const router = Router();

router.get("/user:id/operation", getOperationData);

export default router;
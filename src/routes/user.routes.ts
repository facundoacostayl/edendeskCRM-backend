import {Router} from 'express';
const router = Router();
import {createUser} from '../controllers/user.controllers';

router.post('/registro', createUser);

export default router;
import {Router} from 'express';
const router = Router();
import {createUser, loginUser, authorizeToken} from '../controllers/user.controllers';
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/registro', validInfo, createUser);
router.post('/login', validInfo, loginUser);
router.get('/verificar', authorization, authorizeToken);

export default router;
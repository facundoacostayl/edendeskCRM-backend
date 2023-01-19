import {Router} from 'express';
const router = Router();
import {createUser, loginUser, authorizeToken, getUser, updateUser} from '../controllers/user.controllers';
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/registro', validInfo, createUser);
router.post('/login', validInfo, loginUser);
router.get('/verificar', authorization, authorizeToken);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);

export {router};
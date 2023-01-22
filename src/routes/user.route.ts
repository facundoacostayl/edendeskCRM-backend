import {Router} from 'express';
const router = Router();
import {createItem, loginUser, authorizeToken, getItem, updateUser} from '../controllers/user.controller';
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/registro', validInfo, createItem);
router.post('/login', validInfo, loginUser);
router.get('/verificar', authorization, authorizeToken);
router.get('/:id', getItem);
router.patch('/:id', updateUser);

export {router};
import {Router} from 'express';
const router = Router();
import {createItem, loginItem, authorizeToken, getItem, updateUser} from '../controllers/user.controller';
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/registro', validInfo, createItem);
router.post('/login', validInfo, loginItem);
router.get('/verificar', authorization, authorizeToken);
router.get('/:id', getItem);
router.patch('/:id', updateUser);

export {router};
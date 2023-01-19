"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const user_controller_1 = require("../controllers/user.controller");
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');
router.post('/registro', validInfo, user_controller_1.createUser);
router.post('/login', validInfo, user_controller_1.loginUser);
router.get('/verificar', authorization, user_controller_1.authorizeToken);
router.get('/user/:id', user_controller_1.getUser);
router.patch('/user/:id', user_controller_1.updateUser);
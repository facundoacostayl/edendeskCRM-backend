"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const authorization = require("../middleware/authorization");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
router.get('/dashboard', authorization, dashboard_controller_1.getInfo);

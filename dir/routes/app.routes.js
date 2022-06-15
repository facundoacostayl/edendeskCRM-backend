"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authorization = require("../middleware/authorization");
const dashboard_controllers_1 = require("../controllers/dashboard.controllers");
router.get('/dashboard', authorization, dashboard_controllers_1.getInfo);
exports.default = router;

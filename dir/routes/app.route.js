"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const jwtAuthorization_1 = require("../middleware/jwtAuthorization");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
router.get("/dashboard", jwtAuthorization_1.authJwt, dashboard_controller_1.getItem);

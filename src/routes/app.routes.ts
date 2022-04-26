import { Router } from "express";
const router = Router();
const authorization = require("../middleware/authorization");
import { getInfo } from "../controllers/dashboard.controllers";

router.get('/dashboard', authorization, getInfo);

export default router;

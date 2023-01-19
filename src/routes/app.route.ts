import { Router } from "express";
const router = Router();
const authorization = require("../middleware/authorization");
import { getInfo } from "../controllers/dashboard.controller";

router.get('/dashboard', authorization, getInfo);

export {router};

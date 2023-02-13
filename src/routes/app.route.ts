import { Router } from "express";
const router = Router();
import { authorization } from "../middleware/authorization";
import { getInfo } from "../controllers/dashboard.controller";

router.get("/dashboard", authorization, getInfo);

export { router };

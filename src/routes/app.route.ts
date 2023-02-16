import { Router } from "express";
const router = Router();
import { authJwt } from "../middleware/jwtAuthorization";
import { getItem } from "../controllers/dashboard.controller";

router.get("/dashboard", authJwt, getItem);

export { router };

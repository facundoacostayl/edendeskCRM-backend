import { Router } from "express";
const router = Router();
import { authJwt } from "../middleware/jwtAuthorization";
import { getInfo } from "../controllers/dashboard.controller";

router.get("/dashboard", authJwt, getInfo);

export { router };

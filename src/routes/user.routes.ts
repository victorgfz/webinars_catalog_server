import express from "express";
import { getLoggedUserInfo } from "../controllers/user.controllers";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router()

router.get("/", authenticate, getLoggedUserInfo)

export default router;
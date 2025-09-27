import express from "express";
import { Response, Request } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { registerSchema } from "../schemas/schemas";
import { registerNewUser } from "../controllers/auth.controllers";
import { checkIfExists } from "../middlewares/checkIfExists";



const router = express.Router()

router.post("/register", validateSchema(registerSchema), checkIfExists, registerNewUser)


export default router;
import express from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { registerSchema } from "../schemas/schemas";
import { loginUser, registerNewUser } from "../controllers/auth.controllers";
import { checkIfExists } from "../middlewares/checkIfExists";



const router = express.Router()

router.post("/register", validateSchema(registerSchema), checkIfExists.emailInUser, registerNewUser)
router.post("/login", loginUser)


export default router;
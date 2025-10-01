import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { getWebinarList, getWebinarById, enrollUserToWebinar, addNewWebinar } from "../controllers/webinar.controllers";
import { validateSchema } from "../middlewares/validateSchema";
import { enrollmentSchema } from "../schemas/schemas";
import { checkIfExists } from "../middlewares/checkIfExists";

const router = express.Router()

router.get("/", authenticate, getWebinarList)
router.post("/", addNewWebinar)
router.get("/:id", authenticate, getWebinarById)
router.post("/:id/enrollment", authenticate, validateSchema(enrollmentSchema), checkIfExists.linkedinInUserWebinar, checkIfExists.emailInUserWebinar, enrollUserToWebinar)


export default router;
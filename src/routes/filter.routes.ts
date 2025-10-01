import express from "express";
import { addNewCategory, addNewSpeaker, getAllCategories, getAllSpeakers, getFilterList } from "../controllers/filter.controllers";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router()


router.get("/", authenticate, getFilterList)

router.post("/categories", addNewCategory)
router.post("/speakers", addNewSpeaker)

router.get("/categories", getAllCategories)
router.get("/speakers", getAllSpeakers)


export default router;
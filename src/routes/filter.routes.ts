import express from "express";
import { getFilterList } from "../controllers/filter.controllers";

const router = express.Router()


router.get("/", getFilterList)

export default router;
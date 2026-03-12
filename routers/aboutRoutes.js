import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", protect, updateAbout);

export default router;
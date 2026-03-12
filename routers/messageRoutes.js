import express from "express";
import {
    submitContact,
    getMessages,
    markAsRead,
    deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, getMessages);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
import express from "express";
import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/projectControllers.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Public routes — no token needed
router.get("/", getProjects); // GET  /api/projects
router.get("/:id", getProject); // GET  /api/projects/:id

// Protected routes — must be logged in
// upload.single("image") runs BEFORE the controller
// it intercepts the file, uploads to Cloudinary, attaches result to req.file
router.post("/", protect, upload.single("image"), createProject); // POST   /api/projects
router.put("/:id", protect, upload.single("image"), updateProject); // PUT    /api/projects/:id
router.delete("/:id", protect, deleteProject);

export default router;
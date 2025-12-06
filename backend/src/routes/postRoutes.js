// src/routes/postRoutes.js (update this file)
import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/postController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes (no authentication needed)
router.get("/", getAllPosts);
router.get("/search", searchPosts);
router.get("/:id", getPostById);

// Protected routes (require authentication)
router.post("/", protect, upload.single("image"), createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;

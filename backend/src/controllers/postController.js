import Post from "../models/Post.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Post
export const createPost = async (req, res) => {
  try {
    const {
      username,
      location,
      observationTime,
      observationDate,
      butterflyType,
      primaryActivity,
      duration,
      comments,
    } = req.body;

    const userId = req.userId; // From auth middleware

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const post = await Post.create({
      userId,
      username,
      location,
      observationTime,
      observationDate,
      butterflyType,
      primaryActivity,
      duration: parseInt(duration),
      comments,
      imageUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Posts
export const searchPosts = async (req, res) => {
  try {
    const { keyword } = req.query;

    const posts = await Post.find({
      $or: [
        { comments: { $regex: keyword, $options: "i" } },
        { butterflyType: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

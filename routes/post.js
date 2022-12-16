import express from "express";
import { getAllPosts } from "../controllers/posts/getAllPosts.js";
import { deletePost } from "../controllers/posts/deletePost.js";
const router = express.Router();

router.get("/", getAllPosts);
router.delete("/:id", deletePost);

export default router;

import express from "express";
import { getAllPosts } from "../controllers/posts/getAllPosts.js";
import { deletePost } from "../controllers/posts/deletePost.js";
import { getPersonPosts } from "../controllers/posts/getPersonPosts.js";
import { addPost } from "../controllers/posts/addPost.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:name", getPersonPosts);
router.post("/post", addPost);
router.delete("/:id", deletePost);

export default router;

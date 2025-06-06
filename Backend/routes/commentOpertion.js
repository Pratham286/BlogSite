import express from "express"
import { verifyToken } from "../middleware/verify.js";
import { createComment, deleteComment, getBlogComment, getUserComment, updateComment } from "../controller/commentController.js";
import { verifyComment } from "../middleware/verifyComment.js";
import { updateBlog } from "../controller/dashController.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomment/:id", verifyToken, getBlogComment)
router.get("/getusercomment", verifyToken, getUserComment)
router.delete("/delete/:id", verifyToken, verifyComment, deleteComment)
router.put("/update/:id", verifyToken, verifyComment, updateComment)

export default router;
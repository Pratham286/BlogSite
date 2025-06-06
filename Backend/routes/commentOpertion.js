import express from "express"
import { verifyToken } from "../middleware/verify.js";
import { createComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
// router.post("/getcomment", verifyToken, )

export default router;
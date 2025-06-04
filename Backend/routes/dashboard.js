import express from "express"
import { verifyToken } from "../middleware/verify.js";
import { createBlog, deleteAllBlog, deleteBlog, getAllBlog, getBlog, getUserBlog, updateBlog, verifyUser } from "../controller/dashController.js";

const router = express.Router();

// router.get("/verify", verifyToken, verifyUser);

router.get("/verify", verifyToken, verifyUser)

router.post("/create", verifyToken, createBlog)
router.get("/blog/:id", verifyToken, getBlog)
router.put("/edit/:id", verifyToken, updateBlog)
router.delete("/delete/:id", verifyToken, deleteBlog )
router.delete("/deleteall", verifyToken, deleteAllBlog)
router.get("/getAll", verifyToken, getAllBlog)
router.get("/getUser", verifyToken, getUserBlog)

export default router;
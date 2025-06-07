import express from "express"
import { verifyToken } from "../middleware/verify.js";
import { checkLike, deregisterLike, registerLike } from "../controller/likeController.js";

const router = express.Router();

router.get("/register/:id", verifyToken, registerLike)
router.get("/deregister/:id", verifyToken, deregisterLike)
router.get("/isliked/:id", verifyToken, checkLike)
export default router;
import express from "express"
import { loginFunction, signupFuntion } from "../controller/authController.js";


const router = express.Router();

router.post("/signup", signupFuntion)
router.post("/login", loginFunction)

export default router;
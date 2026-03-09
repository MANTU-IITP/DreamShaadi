import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { signupValidation,loginValidation } from "../Middlewares/Authvalidation.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;

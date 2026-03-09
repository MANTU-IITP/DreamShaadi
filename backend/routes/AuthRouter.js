import express from "express";
import { signup, login, saveVendorOnboarding } from "../controllers/auth.controller.js";
import { signupValidation,loginValidation } from "../middlewares/Authvalidation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/vendor-onboarding", ensureAuthenticated, saveVendorOnboarding);

export default router;

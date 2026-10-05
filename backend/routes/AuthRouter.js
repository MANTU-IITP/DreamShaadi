import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  signup,
  login,
  saveVendorOnboarding,
  getNotifications,
  markNotificationRead,
  toggleWishlist,
  getWishlist,
} from "../controllers/auth.controller.js";
import { signupValidation,loginValidation } from "../middlewares/Authvalidation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many authentication attempts. Please try again later." },
});

router.post("/signup", authLimiter, signupValidation, signup);
router.post("/login", authLimiter, loginValidation, login);
router.post("/vendor-onboarding", ensureAuthenticated, saveVendorOnboarding);
router.get("/notifications", ensureAuthenticated, getNotifications);
router.patch("/notifications/:id/read", ensureAuthenticated, markNotificationRead);
router.get("/wishlist", ensureAuthenticated, getWishlist);
router.post("/wishlist/:vendorId", ensureAuthenticated, toggleWishlist);

export default router;

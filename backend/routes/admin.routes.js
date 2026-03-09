import express from "express";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { ensureAdmin } from "../middlewares/admin.middleware.js";
import {
  getAdminDashboard,
  getAllUsersForAdmin,
  getAllVendorsForAdmin,
  updateVendorApproval,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", ensureAuthenticated, ensureAdmin, getAdminDashboard);
router.get("/users", ensureAuthenticated, ensureAdmin, getAllUsersForAdmin);
router.get("/vendors", ensureAuthenticated, ensureAdmin, getAllVendorsForAdmin);
router.patch("/vendors/:id/approval", ensureAuthenticated, ensureAdmin, updateVendorApproval);

export default router;

// routes/vendor.routes.js
import express from "express";
import multer from "multer";
import {
  addVendorReview,
  createVendor,
  createVendorCheckIn,
  getVendorLeads,
  getVendorById,
  getAllVendors,
  getMyVendors,
  appendVendorMedia,
  requestVendorContactOtp,
  verifyVendorContactOtp,
  registerVendorView,
  updateCheckInStatus,
  uploadVendorMedia,
  updateVendor,
  deleteVendor,
  searchVendors,
  getVendorStats,
} from "../controllers/vendor.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 20 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      callback(null, true);
    } else {
      callback(new Error("Only image and video uploads are allowed"));
    }
  },
});

// Base path when mounted: /vendor/post
router.post("/create", ensureAuthenticated, createVendor);
router.post("/upload-media", ensureAuthenticated, upload.array("files", 20), uploadVendorMedia);
router.post("/:id/media", ensureAuthenticated, upload.array("files", 20), appendVendorMedia);
router.get("/getone/:id", getVendorById);
router.get("/getall", getAllVendors);
router.get("/search", searchVendors);
router.get("/mine", ensureAuthenticated, getMyVendors);
router.put("/update/:id", ensureAuthenticated, updateVendor);
router.delete("/delete/:id", ensureAuthenticated, deleteVendor);
router.post("/:id/view", registerVendorView);
router.post("/:id/contact/request-otp", requestVendorContactOtp);
router.post("/:id/contact/verify-otp", verifyVendorContactOtp);
router.post("/:id/checkin", createVendorCheckIn);
router.post("/:id/reviews", addVendorReview);
router.get("/:id/leads", ensureAuthenticated, getVendorLeads);
router.get("/:id/stats", ensureAuthenticated, getVendorStats);
router.patch("/:id/checkin/:checkInId/status", ensureAuthenticated, updateCheckInStatus);

export default router;

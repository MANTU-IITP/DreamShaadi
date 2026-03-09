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
} from "../controllers/vendor.controller.js";
import Vendor from "../models/Vendor.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Base path when mounted: /vendor/post
router.post("/create", ensureAuthenticated, createVendor);
router.post("/upload-media", ensureAuthenticated, upload.array("files", 20), uploadVendorMedia);
router.post("/:id/media", ensureAuthenticated, upload.array("files", 20), appendVendorMedia);
router.get("/getone/:id", getVendorById);
router.get("/getall", getAllVendors);
router.get("/mine", ensureAuthenticated, getMyVendors);
router.put("/update/:id", ensureAuthenticated, updateVendor);
router.delete("/delete/:id", ensureAuthenticated, deleteVendor);
router.post("/:id/view", registerVendorView);
router.post("/:id/contact/request-otp", requestVendorContactOtp);
router.post("/:id/contact/verify-otp", verifyVendorContactOtp);
router.post("/:id/checkin", createVendorCheckIn);
router.post("/:id/reviews", addVendorReview);
router.get("/:id/leads", ensureAuthenticated, getVendorLeads);
router.patch("/:id/checkin/:checkInId/status", ensureAuthenticated, updateCheckInStatus);
router.get("/search", async (req, res) => {
  try {
    const search = req.query.q || "";

    // Search in multiple fields
    const results = await Vendor.find({
      approvalStatus: "approved",
      $or: [
        { businessname: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { landMark: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ],
    }).select("-phone");

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

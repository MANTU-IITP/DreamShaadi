// routes/vendor.routes.js
import express from "express";
import {
  createVendor,
  getVendorById,
  getAllVendors,
  updateVendor,
  deleteVendor,
} from "../controllers/vendor.controller.js";
import Vendor from "../models/Vendor.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Base path when mounted: /vendor/post
router.post("/create", ensureAuthenticated, createVendor);
router.get("/getone/:id", getVendorById);
router.get("/getall", getAllVendors);
router.put("/update/:id", ensureAuthenticated, updateVendor);
router.delete("/delete/:id", ensureAuthenticated, deleteVendor);
router.get("/search", async (req, res) => {
  try {
    const search = req.query.q || "";

    // Search in multiple fields
    const results = await Vendor.find({
      $or: [
        { businessname: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { landMark: { $regex: search, $options: "i" } }
      ],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

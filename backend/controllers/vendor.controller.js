import Vendor from "../models/Vendor.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isAdminEmail } from "../middlewares/admin.middleware.js";

const contactOtpStore = new Map();

const applyMediaFallbacks = (payload, existing = null) => {
  const galleryImages = Array.isArray(payload.galleryImages) ? payload.galleryImages : [];
  payload.image1 = payload.image1 || galleryImages[0] || existing?.image1 || "";
  payload.image2 = payload.image2 || galleryImages[1] || existing?.image2 || "";
  payload.image3 = payload.image3 || galleryImages[2] || existing?.image3 || "";
};

const getRequesterAccess = async (vendor, req) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  if (!token) return { isOwner: false, isAdmin: false };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requesterId = String(decoded?._id || "");
    const isOwner = requesterId && vendor.user.toString() === requesterId;
    if (isOwner) return { isOwner: true, isAdmin: false };
    const requester = await User.findById(requesterId).select("email");
    const isAdmin = requester ? isAdminEmail(requester.email) : false;
    return { isOwner: false, isAdmin };
  } catch {
    return { isOwner: false, isAdmin: false };
  }
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploaded = await Promise.all(
    files.map(async (file) => {
      const isVideo = file.mimetype.startsWith("video/");
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "wedplanner/vendors",
        resource_type: isVideo ? "video" : "image",
      });
      return { url: result.secure_url, type: isVideo ? "video" : "image" };
    })
  );
  const images = uploaded.filter((item) => item.type === "image").map((item) => item.url);
  const videos = uploaded.filter((item) => item.type === "video").map((item) => item.url);
  return { media: uploaded, images, videos };
};

export const createVendor = async (req, res) => {
  try {
    const data = { ...req.body, user: req.user.userId };
    applyMediaFallbacks(data);
    const created = await Vendor.create(data);
    return res.status(201).json(created);
  } catch (error) {
    console.error("createVendor error:", error);
    return res.status(500).json({ error: "Vendor create failed", details: error?.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendorExist = await Vendor.findById(req.params.id);
    if (!vendorExist) return res.status(404).json({ msg: "vendor not found" });
    const access = await getRequesterAccess(vendorExist, req);

    if (vendorExist.approvalStatus !== "approved") {
      if (!access.isOwner && !access.isAdmin) {
        return res.status(403).json({ msg: "This vendor post is not publicly available yet" });
      }
    }

    // Do not expose direct contact to public users.
    const payload = vendorExist.toObject();
    payload.phone = access.isOwner || access.isAdmin ? payload.phone : "";
    payload.contactLocked = !(access.isOwner || access.isAdmin);
    return res.status(200).json(payload);
  } catch (error) {
    console.error("getVendorById error:", error);
    return res.status(500).json({ error });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const allVendors = await Vendor.find({ approvalStatus: "approved" }).select("-phone").populate("user", "name email").exec();
    return res.status(200).json(allVendors || []);
  } catch (error) {
    console.error("getAllVendors error:", error);
    return res.status(500).json({ error });
  }
};

export const getMyVendors = async (req, res) => {
  try {
    const myVendors = await Vendor.find({ user: req.user.userId }).sort({ createdAt: -1 }).exec();
    return res.status(200).json(myVendors);
  } catch (error) {
    console.error("getMyVendors error:", error);
    return res.status(500).json({ error });
  }
};

export const uploadVendorMedia = async (req, res) => {
  try {
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ error: "No files uploaded" });
    const result = await uploadFilesToCloudinary(files);
    return res.status(200).json(result);
  } catch (error) {
    console.error("uploadVendorMedia error:", error);
    return res.status(500).json({
      error: "Media upload failed",
      details: error?.message || "Unknown Cloudinary error",
    });
  }
};

export const appendVendorMedia = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });
    if (vendor.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    const files = req.files || [];
    if (!files.length) return res.status(400).json({ error: "No files uploaded" });
    const uploaded = await uploadFilesToCloudinary(files);

    vendor.media = [...(vendor.media || []), ...uploaded.media];
    vendor.galleryImages = [...(vendor.galleryImages || []), ...uploaded.images];
    vendor.galleryVideos = [...(vendor.galleryVideos || []), ...uploaded.videos];
    applyMediaFallbacks(vendor, vendor);
    await vendor.save();

    return res.status(200).json({ msg: "Media added", vendor, uploaded });
  } catch (error) {
    console.error("appendVendorMedia error:", error);
    return res.status(500).json({ error: "Unable to append media" });
  }
};

export const requestVendorContactOtp = async (req, res) => {
  try {
    const { viewerPhone = "", viewerEmail = "" } = req.body || {};
    if (!viewerPhone && !viewerEmail) {
      return res.status(400).json({ error: "viewerPhone or viewerEmail is required" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });

    const target = viewerPhone || viewerEmail;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const key = `${req.params.id}:${target}`;
    contactOtpStore.set(key, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // For development mode, return otp in response.
    return res.status(200).json({
      msg: "OTP generated",
      developmentOtp: otp,
      expiresInSeconds: 300,
    });
  } catch (error) {
    console.error("requestVendorContactOtp error:", error);
    return res.status(500).json({ error: "Unable to generate OTP" });
  }
};

export const verifyVendorContactOtp = async (req, res) => {
  try {
    const { viewerPhone = "", viewerEmail = "", otp = "" } = req.body || {};
    const target = viewerPhone || viewerEmail;
    if (!target || !otp) {
      return res.status(400).json({ error: "target contact and otp are required" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });

    const key = `${req.params.id}:${target}`;
    const data = contactOtpStore.get(key);
    if (!data) return res.status(400).json({ error: "OTP not requested" });
    if (Date.now() > data.expiresAt) {
      contactOtpStore.delete(key);
      return res.status(400).json({ error: "OTP expired" });
    }
    if (data.otp !== String(otp)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    contactOtpStore.delete(key);

    const rawPhone = String(vendor.phone || "").replace(/\D/g, "");
    const whatsappLink = rawPhone ? `https://wa.me/${rawPhone}` : "";
    return res.status(200).json({
      msg: "OTP verified",
      phone: vendor.phone || "",
      whatsappLink,
    });
  } catch (error) {
    console.error("verifyVendorContactOtp error:", error);
    return res.status(500).json({ error: "Unable to verify OTP" });
  }
};

export const registerVendorView = async (req, res) => {
  try {
    const { viewerName = "", viewerEmail = "", viewerPhone = "" } = req.body || {};
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });

    vendor.viewsCount += 1;
    if (viewerName || viewerEmail || viewerPhone) {
      vendor.viewLogs.push({ viewerName, viewerEmail, viewerPhone, viewedAt: new Date() });
    }
    await vendor.save();
    return res.status(200).json({ viewsCount: vendor.viewsCount });
  } catch (error) {
    console.error("registerVendorView error:", error);
    return res.status(500).json({ error: "Unable to register view" });
  }
};

export const createVendorCheckIn = async (req, res) => {
  try {
    const { name, email, phone, eventDate, guests = 0, message = "" } = req.body || {};
    if (!name || !email || !phone || !eventDate) {
      return res.status(400).json({ error: "name, email, phone, eventDate are required" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });

    vendor.checkIns.push({ name, email, phone, eventDate, guests, message, status: "new" });
    await vendor.save();
    return res.status(201).json({ msg: "Check-in submitted successfully" });
  } catch (error) {
    console.error("createVendorCheckIn error:", error);
    return res.status(500).json({ error: "Unable to submit check-in" });
  }
};

export const addVendorReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body || {};
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: "name, rating, comment are required" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });

    vendor.reviews.push({ name, rating: Number(rating), comment, createdAt: new Date() });
    const avgRating =
      vendor.reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / vendor.reviews.length;
    vendor.rating = Number(avgRating.toFixed(1));
    await vendor.save();

    return res.status(201).json({ msg: "Review added successfully", rating: vendor.rating });
  } catch (error) {
    console.error("addVendorReview error:", error);
    return res.status(500).json({ error: "Unable to add review" });
  }
};

export const getVendorLeads = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });
    if (vendor.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    return res.status(200).json({
      viewsCount: vendor.viewsCount,
      viewLogs: vendor.viewLogs,
      checkIns: vendor.checkIns,
      reviews: vendor.reviews,
    });
  } catch (error) {
    console.error("getVendorLeads error:", error);
    return res.status(500).json({ error: "Unable to fetch leads" });
  }
};

export const updateCheckInStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["new", "contacted", "closed"].includes(status)) {
      return res.status(400).json({ error: "status must be new, contacted, or closed" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "vendor not found" });
    if (vendor.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    const checkIn = vendor.checkIns.id(req.params.checkInId);
    if (!checkIn) return res.status(404).json({ error: "Check-in not found" });
    checkIn.status = status;
    await vendor.save();

    return res.status(200).json({ msg: "Check-in status updated" });
  } catch (error) {
    console.error("updateCheckInStatus error:", error);
    return res.status(500).json({ error: "Unable to update check-in status" });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendorExist = await Vendor.findById(req.params.id);
    if (!vendorExist) return res.status(404).json({ msg: "vendor not found" });
    if (vendorExist.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    const payload = { ...req.body };
    applyMediaFallbacks(payload, vendorExist);
    const updated = await Vendor.findByIdAndUpdate(req.params.id, payload, { new: true });
    return res.status(200).json({ msg: "vendor data updated", data: updated });
  } catch (error) {
    console.error("updateVendor error:", error);
    return res.status(500).json({ error });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendorExist = await Vendor.findById(req.params.id);
    if (!vendorExist) return res.status(404).json({ msg: "Vendor not exist" });
    if (vendorExist.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    await Vendor.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Vendor deleted successfully" });
  } catch (error) {
    console.error("deleteVendor error:", error);
    return res.status(500).json({ error });
  }
};

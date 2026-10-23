import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { isAdminEmail } from "../middlewares/admin.middleware.js";
import mongoose from "mongoose";



export const signup = async (req, res) => {
  try {
    const { name, email, password, role = "couple" } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists, you can login", success: false });
    }

    const userModel = new UserModel({ name, email, password, role });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

  
   

    return res.status(201).json({
      message: "Signup successful",
      success: true,
     
      user: { id: userModel._id, name: userModel.name, email: userModel.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = "Auth failed: email or password is wrong";

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

      const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

   res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name,
                isAdmin: isAdminEmail(user.email),
                role: user.role,
                vendorProfile: user.vendorProfile,
            })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const saveVendorOnboarding = async (req, res) => {
  try {
    const { businessName, category, city, phone, about = "", profileImage = "" } = req.body || {};
    if (!businessName || !category || !city || !phone) {
      return res.status(400).json({ message: "businessName, category, city, phone are required" });
    }

    const user = await UserModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = user.role === "admin" ? "admin" : "vendor";
    user.vendorProfile = {
      businessName,
      category,
      city,
      phone,
      about,
      profileImage,
      completed: true,
    };
    await user.save();

    return res.status(200).json({
      message: "Vendor onboarding saved",
      user: {
        id: user._id,
        role: user.role,
        vendorProfile: user.vendorProfile,
      },
    });
  } catch (error) {
    console.error("saveVendorOnboarding error:", error);
    return res.status(500).json({ message: "Unable to save vendor onboarding" });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("notifications");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json([...user.notifications].sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error("getNotifications error:", error);
    return res.status(500).json({ message: "Unable to fetch notifications" });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("notifications");
    if (!user) return res.status(404).json({ message: "User not found" });
    const notification = user.notifications.id(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    notification.read = true;
    await user.save();
    return res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("markNotificationRead error:", error);
    return res.status(500).json({ message: "Unable to update notification" });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.vendorId)) {
      return res.status(400).json({ message: "Invalid vendor id" });
    }
    const user = await UserModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const vendorId = String(req.params.vendorId);
    const index = user.wishlist.findIndex((item) => item.toString() === vendorId);
    let saved = true;
    if (index >= 0) {
      user.wishlist.splice(index, 1);
      saved = false;
    } else {
      user.wishlist.push(vendorId);
    }
    await user.save();
    return res.json({ saved, wishlist: user.wishlist });
  } catch (error) {
    console.error("toggleWishlist error:", error);
    return res.status(500).json({ message: "Unable to update wishlist" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).populate({
      path: "wishlist",
      match: { approvalStatus: "approved" },
      select: "-phone -bookings -viewLogs -checkIns",
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user.wishlist.filter(Boolean));
  } catch (error) {
    console.error("getWishlist error:", error);
    return res.status(500).json({ message: "Unable to fetch wishlist" });
  }
};

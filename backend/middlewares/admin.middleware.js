import User from "../models/User.js";

const parseAdminEmails = () => {
  const csv = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  return csv
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
};

export const isAdminEmail = (email = "") => {
  return parseAdminEmails().includes(String(email).toLowerCase());
};

export const ensureAdmin = async (req, res, next) => {
  try {
    if (!req.user?.userId) return res.status(403).json({ message: "Unauthorized" });
    const user = await User.findById(req.user.userId).select("email");
    if (!user) return res.status(403).json({ message: "Unauthorized" });
    if (!isAdminEmail(user.email)) return res.status(403).json({ message: "Admin access required" });
    next();
  } catch (error) {
    console.error("ensureAdmin error:", error);
    return res.status(500).json({ message: "Unable to verify admin access" });
  }
};

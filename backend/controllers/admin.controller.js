import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const [usersCount, vendorsCount, pendingCount, approvedCount, rejectedCount, latestUsers, latestVendors] =
      await Promise.all([
        User.countDocuments(),
        Vendor.countDocuments(),
        Vendor.countDocuments({ approvalStatus: "pending" }),
        Vendor.countDocuments({ approvalStatus: "approved" }),
        Vendor.countDocuments({ approvalStatus: "rejected" }),
        User.find().sort({ createdAt: -1 }).limit(10).select("name email createdAt"),
        Vendor.find()
          .sort({ createdAt: -1 })
          .limit(10)
          .populate("user", "name email")
          .select("businessname city category approvalStatus createdAt user"),
      ]);

    return res.status(200).json({
      stats: { usersCount, vendorsCount, pendingCount, approvedCount, rejectedCount },
      latestUsers,
      latestVendors,
    });
  } catch (error) {
    console.error("getAdminDashboard error:", error);
    return res.status(500).json({ error: "Unable to fetch admin dashboard" });
  }
};

export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("name email createdAt");
    return res.status(200).json(users);
  } catch (error) {
    console.error("getAllUsersForAdmin error:", error);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
};

export const getAllVendorsForAdmin = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      filter.approvalStatus = status;
    }

    const vendors = await Vendor.find(filter).sort({ createdAt: -1 }).populate("user", "name email");
    return res.status(200).json(vendors);
  } catch (error) {
    console.error("getAllVendorsForAdmin error:", error);
    return res.status(500).json({ error: "Unable to fetch vendors" });
  }
};

export const updateVendorApproval = async (req, res) => {
  try {
    const { status, note = "" } = req.body;
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ error: "status must be approved, rejected, or pending" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    vendor.approvalStatus = status;
    vendor.approvalNote = note;
    vendor.approvedAt = status === "approved" ? new Date() : null;
    vendor.approvedBy = status === "approved" ? req.user.userId : null;
    await vendor.save();

    return res.status(200).json({ msg: "Vendor approval updated", vendor });
  } catch (error) {
    console.error("updateVendorApproval error:", error);
    return res.status(500).json({ error: "Unable to update vendor approval" });
  }
};

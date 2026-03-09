// controllers/vendor.controller.js
import Vendor from "../models/Vendor.js";

/**
 * Create vendor post (protected)
 */
export const createVendor = async (req, res) => {//req.user.userId
  try {
    const data = { ...req.body, user:req.user.userId  }; // attach owner from token
    const vendorData = new Vendor(data);
    console.log(data)
    const savedata = await vendorData.save();
    const populatedVendor = await  Vendor.find().populate("user")
    // console.log(populatedVendor);

    return res.status(200).json(populatedVendor);
  } catch (error) {
    console.error("createVendor error:", error);
    return res.status(500).json({ error });
  }
};

/**
 * Get one vendor by id (public)
 */
export const getVendorById = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) {
      return res.status(404).json({ msg: "vendor not found" });
    }
    return res.status(200).json(vendorExist);
  } catch (error) {
    console.error("getVendorById error:", error);
    return res.status(500).json({ error });
  }
};

/**
 * Get all vendors (public)
 */
export const getAllVendors = async (req, res) => {
  try {
    // Populate the 'user' field with User model data
    const allVendors = await Vendor.find()
      .populate("user", "name email") // only show name & email
      .exec();

    if (!allVendors || allVendors.length === 0) {
      return res.status(404).json({ msg: "No vendors found" });
    }

    return res.status(200).json(allVendors);
  } catch (error) {
    console.error("getAllVendors error:", error);
    return res.status(500).json({ error });
  }
};

/**
 * Update vendor by id (protected, only owner)
 */
export const updateVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) return res.status(404).json({ msg: "vendor not found" });

    // owner check
    if (vendorExist.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    const updated = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ msg: "vendor data updated", data: updated });
  } catch (error) {
    console.error("updateVendor error:", error);
    return res.status(500).json({ error });
  }
};

/**
 * Delete vendor by id (protected, only owner)
 */
export const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) return res.status(404).json({ msg: "Vendor not exist" });

    if (vendorExist.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden: you are not the owner" });
    }

    await Vendor.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Vendor deleted successfully" });
  } catch (error) {
    console.error("deleteVendor error:", error);
    return res.status(500).json({ error });
  }
};

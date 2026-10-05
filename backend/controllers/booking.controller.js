import Vendor from "../models/Vendor.js";
import User from "../models/User.js";

const isSameDay = (left, right) => {
  const first = new Date(left);
  const second = new Date(right);
  return first.toISOString().slice(0, 10) === second.toISOString().slice(0, 10);
};

export const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventDate,
      packageName = "",
      tokenAmount = 0,
      notes = "",
    } = req.body || {};

    if (!name || !email || !phone || !eventDate) {
      return res.status(400).json({ error: "name, email, phone, and eventDate are required" });
    }

    const parsedDate = new Date(eventDate);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      return res.status(400).json({ error: "Please select a valid future event date" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor || vendor.approvalStatus !== "approved") {
      return res.status(404).json({ error: "Vendor not found or unavailable" });
    }

    const unavailable = vendor.bookedDates.some((date) => isSameDay(date, parsedDate))
      || vendor.bookings.some(
        (booking) => booking.status !== "cancelled" && isSameDay(booking.eventDate, parsedDate)
      );
    if (unavailable) {
      return res.status(409).json({ error: "This date is no longer available" });
    }

    vendor.bookings.push({
      name,
      email,
      phone,
      eventDate: parsedDate,
      packageName,
      tokenAmount: Number(tokenAmount) || 0,
      notes,
    });
    await vendor.save();

    await User.findByIdAndUpdate(vendor.user, {
      $push: {
        notifications: {
          message: `New booking request from ${name} for ${vendor.businessname}`,
          link: `/vendor/admin/${vendor._id}/bookings`,
        },
      },
    });

    return res.status(201).json({
      message: "Booking request sent successfully",
      booking: vendor.bookings.at(-1),
    });
  } catch (error) {
    console.error("createBooking error:", error);
    return res.status(500).json({ error: "Unable to create booking" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("user bookings");
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    if (vendor.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Only the vendor owner can view bookings" });
    }
    return res.json([...vendor.bookings].sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error("getBookings error:", error);
    return res.status(500).json({ error: "Unable to fetch bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "status must be confirmed or cancelled" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    if (vendor.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Only the vendor owner can update bookings" });
    }

    const booking = vendor.bookings.id(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = status;
    const existingDateIndex = vendor.bookedDates.findIndex((date) => isSameDay(date, booking.eventDate));
    if (status === "confirmed" && existingDateIndex === -1) {
      vendor.bookedDates.push(booking.eventDate);
    }
    if (status === "cancelled" && existingDateIndex !== -1) {
      vendor.bookedDates.splice(existingDateIndex, 1);
    }
    await vendor.save();

    return res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    console.error("updateBookingStatus error:", error);
    return res.status(500).json({ error: "Unable to update booking" });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      _id: req.params.id,
      approvalStatus: "approved",
    }).select("bookedDates bookings");
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    const bookingDates = vendor.bookings
      .filter((booking) => booking.status === "confirmed")
      .map((booking) => booking.eventDate);
    const uniqueDates = [...new Set(
      [...vendor.bookedDates, ...bookingDates].map((date) => new Date(date).toISOString().slice(0, 10))
    )];
    return res.json({ bookedDates: uniqueDates });
  } catch (error) {
    console.error("getAvailability error:", error);
    return res.status(500).json({ error: "Unable to fetch availability" });
  }
};

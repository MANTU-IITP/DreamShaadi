import express from "express";
import {
  createBooking,
  getAvailability,
  getBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:id/book", createBooking);
router.get("/:id/bookings", ensureAuthenticated, getBookings);
router.patch("/:id/bookings/:bookingId/status", ensureAuthenticated, updateBookingStatus);
router.get("/:id/availability", getAvailability);

export default router;

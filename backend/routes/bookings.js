import express from "express";
import { bookRoom, cancelBooking, getUserBookings } from "../controllers/booking.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Book a room (user only)
router.post("/", verifyToken, bookRoom);

// Cancel a booking (user only)
router.delete("/:id", verifyToken, cancelBooking);

// Get all bookings for a user
router.get("/", verifyToken, getUserBookings);

export default router;

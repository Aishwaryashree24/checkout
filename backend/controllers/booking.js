import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

// 📌 Book a Room
export const bookRoom = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const room = await Room.findById(req.body.room);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (user.wallet < req.body.totalPrice) {
      return res.status(400).json({ message: "Insufficient wallet balance!" });
    }

    user.wallet -= req.body.totalPrice;
    await user.save();

    const newBooking = new Booking({ ...req.body, user: req.user.id });
    await newBooking.save();

    res.status(201).json({ success: true, message: "Room booked successfully!" });
  } catch (err) {
    next(err);
  }
};


// 📌 Cancel a Booking
export const cancelBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Booking cancelled successfully!" });
  } catch (err) {
    next(err);
  }
};

// 📌 Get User's Bookings
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

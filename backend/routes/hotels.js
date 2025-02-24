import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken.js"; // ✅ Corrected import
import { validateHotel } from "../middleware/validate.js";

const router = express.Router();

// Create a hotel (hotel owner or admin only) with validation
router.post("/", verifyToken, verifyAdmin, validateHotel, createHotel);

// Update a hotel (hotel owner or admin only)
router.put("/:id", verifyToken, verifyAdmin,updateHotel);

// Delete a hotel (admin only)
router.delete("/:id", verifyToken, verifyAdmin, deleteHotel);

// Get a specific hotel
router.get("/:id", getHotel);

// Get all hotels (with filters)
router.get("/", getHotels);

export default router;

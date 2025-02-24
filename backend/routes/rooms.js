import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from "../controllers/room.js";
import { verifyAdmin , verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create a room (admin only)
router.post("/:hotelid", verifyToken, verifyAdmin, createRoom);

// Update a room (admin only)
router.put("/:id", verifyToken,verifyAdmin, updateRoom);

// Delete a room (admin only)
router.delete("/:id/:hotelid", verifyToken, verifyAdmin, deleteRoom);

// Get a specific room
router.get("/:id", getRoom);

// Get all rooms
router.get("/", getRooms);

export default router;

import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// 📌 Create Room
export const createRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelid);
    if (!hotel) return next(createError(404, "Hotel not found!"));

    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();

    hotel.rooms.push(savedRoom._id);
    await hotel.save();

    res.status(201).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// 📌 Update Room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// 📌 Delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Room deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// 📌 Get Room by ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// 📌 Get All Rooms with Filters, Search, and Sorting
export const getRooms = async (req, res, next) => {
  const { min, max, discount, maxPeople, page = 1, limit = 10, sortBy = "price", order = "asc" } = req.query;

  try {
    const filters = {};
    if (min || max) filters.price = { $gte: min || 1, $lte: max || 9999 };
    if (discount) filters.discount = { $gte: discount };
    if (maxPeople) filters.maxPeople = { $lte: maxPeople };

    const rooms = await Room.find(filters)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

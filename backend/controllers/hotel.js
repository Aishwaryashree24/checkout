import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// 📌 Create a Hotel
export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// 📌 Update Hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// 📌 Delete Hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Hotel deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// 📌 Get Hotel by ID
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// 📌 Get All Hotels with Filters, Search, Sorting, and Pagination
export const getHotels = async (req, res, next) => {
  const { city, state, country, min, max, page = 1, limit = 10, sortBy = "cheapestPrice", order = "asc" } = req.query;
  
  try {
    const filters = {};
    if (city) filters.city = new RegExp(city, "i");
    if (state) filters.state = new RegExp(state, "i");
    if (country) filters.country = new RegExp(country, "i");
    if (min || max) filters.cheapestPrice = { $gte: min || 1, $lte: max || 9999 };

    const hotels = await Hotel.find(filters)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


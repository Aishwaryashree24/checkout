import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true }, // Added state
    country: { type: String, required: true }, // Added country
    code: { type: String, required: true }, // Added code
    distance: { type: String, required: true },
    photos: { type: [String] },
    title: { type: String, required: true },
    description: { type: String, required: true }, // Renamed desc -> description
    rating: { type: Number, min: 0, max: 5 },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
        default: [],
      },
    ],
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    offerings: { type: [String] },
    cancelationPolicy: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", HotelSchema);

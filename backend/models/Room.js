import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Added discount
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    photos: { type: [String] },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);

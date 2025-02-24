import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["guest", "admin", "hotel_owner"], required: true }, // Added user type
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    wallet: { type: Number, default: 0 }, // Added wallet
    nationality: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

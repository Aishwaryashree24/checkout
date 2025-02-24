import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Listen for MongoDB disconnections
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});

export default connectDB;

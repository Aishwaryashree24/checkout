import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 8800,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL, // Frontend URL for CORS
};

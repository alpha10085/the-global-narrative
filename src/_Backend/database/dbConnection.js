import mongoose from "mongoose";
// constant models
import UserModel from "./models/user.model";
import { SingleTypeModel } from "./models/singleType";
import fileModel from "./models/file.model";
import { errorLogModel } from "./models/errorLog.model";
// collections 
// pages
import { landingPageModel } from "./models/pages/landing.model";
// project models
if (!process.env.DB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.DB_URL, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connected");
    return cached.conn;
  } catch (error) {
    console.error("Database connection failed", error.message);
    throw new Error("Failed to connect to the database");
  }
};

export default connectDB;

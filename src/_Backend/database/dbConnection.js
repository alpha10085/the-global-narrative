import mongoose from "mongoose";
// constant models
import UserModel from "./models/constant/user.model";
import { SingleTypeModel } from "./models/constant/singleType";
import fileModel from "./models/constant/file.model";
import { errorLogModel } from "./models/constant/errorLog.model";
import { systemLogger } from "@/utils/consoleProxy";
// collections

// pages

// componants
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
    systemLogger("Database connected");
    return cached.conn;
  } catch (error) {
    console.error("Database connection failed", error.message);
    throw new Error("Failed to connect to the database");
  }
};

export default connectDB;

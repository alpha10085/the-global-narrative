import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 1. User Schema (match your DB structure)
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    confirmEmail: Boolean,
    isActive: Boolean,
    isblocked: Boolean,
    addresses: Array,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
const { DB_URL } = process.env;

// 2. Default admin data
const adminData = {
  fullName: "mohamed",
  email: "alphaxteam@gmail.com",
  password: "$2b$08$5SlpiSTLIVK4Jl9gLrge1eiacTEvdIOVKQt/X1zCU97BZu1tnpmpi",
  role: "admin",
  confirmEmail: false,
  isActive: false,
  isblocked: false,
  addresses: [],
};

// 3. Run script
async function initAdmin() {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected");

    const exists = await User.findOne({ email: adminData.email });

    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    await User.create(adminData);

    console.log("Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
}

initAdmin();

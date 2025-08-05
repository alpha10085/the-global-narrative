import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileModel from "@/_Backend/database/models/constant/file.model";

dotenv.config();

// Setup Cloudinary accounts
const testCloud = cloudinary;
testCloud.config({
  cloud_name: process.env.TEST_CLOUD_NAME,
  api_key: process.env.TEST_API_KEY,
  api_secret: process.env.TEST_API_SECRET,
});

const prodCloud = cloudinary;
prodCloud.config({
  cloud_name: process.env.PRO_CLOUD_NAME,
  api_key: process.env.PRO_API_KEY,
  api_secret: process.env.PRO_API_SECRET,
});

export async function migrateCloudinaryFiles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.PRO_DB_URI);

    const records = await fileModel.find();
    console.log(`Found ${records.length} files to migrate.`);

    for (const file of records) {
      await transferFileByUrl(file, prodCloud);
    }

    console.log("✅ All files migrated successfully.");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

async function transferFileByUrl(file, prodCloud, options = {}) {
  try {
    const result = await prodCloud.uploader.upload(file.url, {
      public_id: file.public_id,
      ...options,
    });

    await fileModel.findByIdAndUpdate(file._id, {
      url: result.secure_url,
      public_id: result.public_id,
    });

    console.log(`✅ Migrated: ${file.filename}`);
  } catch (err) {
    console.error(`❌ Failed to migrate ${file.filename}:`, err.message);
  }
}


import mongoose from "mongoose";
import fileModel from "@/_Backend/database/models/constant/file.model";
import { cloudinary } from "@/_Backend/utils/cloudinary";
import { systemLogger } from "@/utils/consoleProxy";


// Setup Cloudinary accounts

const prodCloud = cloudinary

export async function migrateCloudinaryFiles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL);

    const records = await fileModel.find();
    systemLogger(`Found ${records.length} files to migrate.`);

    for (const file of records) {
      await transferFileByUrl(file, prodCloud);
    }

    systemLogger("✅ All files migrated successfully.");
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

    systemLogger(`✅ Migrated: ${file.filename}`);
  } catch (err) {
    console.error(`❌ Failed to migrate ${file.filename}:`, err.message);
  }
}

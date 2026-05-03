import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fileModel from "../../src/_Backend/database/models/constant/file.model.js";

const { DB_URL, CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// 1️⃣ Connect MongoDB
async function connectDB() {
  await mongoose.connect(DB_URL);
  console.log("✅ MongoDB connected");
}

// 2️⃣ Configure Cloudinary
function connectCloudinary() {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
  console.log("✅ Cloudinary connected");
}

// 3️⃣ Update Videos Thumbnail
async function updateVideoThumbnails() {
  const BATCH_SIZE = 500;
  let updated = 0;

  const cursor = fileModel
    .find({
      mimetype: "video"
    })
    .cursor();
 
  const bulkOps = [];

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const thumbnail = cloudinary.url(doc.public_id, {
      resource_type: "video",
      format: "jpg",
      transformation: [
        { start_offset: "1" },
        { width: 300, height: 300, crop: "fill" },
        { quality: "auto" },
      ],
    });

    bulkOps.push({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { thumbnail } },
      },
    });

    // 🔥 execute in batches
    if (bulkOps.length === BATCH_SIZE) {
      await fileModel.bulkWrite(bulkOps);
      updated += bulkOps.length;
      bulkOps.length = 0;
    }
  }

  // 🔥 remaining ops
  if (bulkOps.length) {
    await fileModel.bulkWrite(bulkOps);
    updated += bulkOps.length;
  }

  console.log(`✅ Updated ${updated} video thumbnails`);
}

// 4️⃣ Main
async function run() {
  try {
    await connectDB();
    connectCloudinary();

    console.log("⏳ Updating video thumbnails...");
    await updateVideoThumbnails();

    console.log("🎉 Done");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

run();

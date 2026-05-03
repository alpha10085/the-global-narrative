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

async function getAllAssets() {
  const resourceTypes = ["image", "video", "raw"];
  const allAssets = [];

  for (const resourceType of resourceTypes) {
    let nextCursor = null;

    do {
      const res = await cloudinary.api.resources({
        type: "upload",
        resource_type: resourceType,
        max_results: 500,
        next_cursor: nextCursor,
      });

      allAssets.push(...res.resources);
      nextCursor = res.next_cursor;
    } while (nextCursor);
  }

  return allAssets;
}

// 4️⃣ Transform + Save
async function saveAssetsToDB(assets) {
  let inserted = 0;

  for (const asset of assets) {
    console.log("🚀 ~ saveAssetsToDB ~ asset:", asset);
    const exists = await fileModel.findOne({ public_id: asset.public_id });
    if (exists) continue;

    await fileModel.create({
      filename: asset.display_name,
      public_id: asset.public_id,
      url: asset.secure_url,
      size: asset.bytes || 0,
      mimetype: asset.resource_type ? asset.resource_type : "unknown",
      originalname: asset.original_filename || asset.public_id,
      thumbnail: asset.secure_url,
      directory: null,
    });

    inserted++;
  }

  console.log(`✅ Inserted ${inserted} new assets`);
}

// 5️⃣ Main runner
async function run() {
  try {
    await connectDB();
    connectCloudinary();

    console.log("⏳ Fetching Cloudinary assets...");
    const assets = await getAllAssets();

    console.log(`📦 Total assets found: ${assets.length}`);

    await saveAssetsToDB(assets);

    console.log("🎉 Sync completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}
run();

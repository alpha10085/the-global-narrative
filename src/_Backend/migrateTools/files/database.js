import mongoose from "mongoose";
import fileModel from "@/_Backend/database/models/constant/file.model";

// 1. Setup MongoDB connections
const localDB = mongoose.createConnection(process.env.LOCAL_DB_URI);
const proDB = mongoose.createConnection(process.env.DB_URL);

const localFileModel = localDB.model("file", fileModel.schema);
const proFileModel = proDB.model("file", fileModel.schema);

export const migrateFilesDB = async () => {
  try {
    const records = await localFileModel.find();
    if (!records.length) return console.log("No records found.");

    const result = await proFileModel.insertMany(records);
    console.log(`${records.length} records migrated.`);

    return result;
  } catch (error) {
    console.log(error);
  }
};

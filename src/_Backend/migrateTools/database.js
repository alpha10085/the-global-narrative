import { systemLogger } from "@/utils/consoleProxy";
import mongoose from "mongoose";

/**
 * Migrates specified models from local DB to production DB
 * @param {Array} models - Array of Mongoose models (from local connection)
 * @param {String} localDbUrl - MongoDB URI for local DB
 * @param {String} proDbUrl - MongoDB URI for production DB
 * @param {Array} sharedModels - Models needed for schema consistency across connections
 * @param {Boolean} clearPro - Whether to clear production data before migration
 */
export const migrateModelsToProd = async (
  models,
  localDbUrl,
  proDbUrl,
  sharedModels = [],
  clearPro = false
) => {
  const localConn = mongoose.createConnection(localDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const proConn = mongoose.createConnection(proDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Ensure shared models are registered
    for (const sharedModel of sharedModels) {
      const { modelName, schema } = sharedModel;
      if (!localConn.models[modelName]) {
        localConn.model(modelName, schema);
      }
      if (!proConn.models[modelName]) {
        proConn.model(modelName, schema);
      }
    }

    for (const model of models) {
      const { modelName, schema } = model;
      systemLogger(`🚀 Migrating model: ${modelName}`);

      const LocalModel =
        localConn.models[modelName] || localConn.model(modelName, schema);
      const ProModel =
        proConn.models[modelName] || proConn.model(modelName, schema);

      const localDocs = await LocalModel.find().lean();

      if (!localDocs.length) {
        systemLogger(`⚠️ No documents found in local for model: ${modelName}`);
        continue;
      }

      if (clearPro) {
        await ProModel.deleteMany({});
        systemLogger(`🗑 Cleared production data for ${modelName}`);
      }

      // Use upsert to prevent duplicates
      const bulkOps = localDocs.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: doc },
          upsert: true,
        },
      }));

      const result = await ProModel.bulkWrite(bulkOps);
      systemLogger(
        `✅ ${modelName} - Inserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`
      );
    }
  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    await localConn.close();
    await proConn.close();
    systemLogger("🔒 Connections closed");
  }
};

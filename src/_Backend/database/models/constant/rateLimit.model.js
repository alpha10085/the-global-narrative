import mongoose, { model, models } from "mongoose";

const rateLimitSchema = new mongoose.Schema(
  {
    identifier: { type: String, required: true }, // IP 
    windowStart: { type: Date, required: true },
    count: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

rateLimitSchema.index({ identifier: 1 }, { unique: true });

const RateLimitModel = models?.rateLimit || model("rateLimit", rateLimitSchema);
export default RateLimitModel;
import mongoose, { model, models } from "mongoose";

const InsightSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      default: "pageview",
      enum: ["pageview"],
    },
    ip: { type: String },
    country: { type: String },
    city: { type: String },
    region: { type: String },
    timezone: { type: String },
    pathname: { type: String },
    referrer: { type: String },
    userAgent: { type: String },
    browser: { type: String },
    os: { type: String },
    device: { type: String },
    visitorKey: { type: String },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const InsightModel = models?.insight || model("insight", InsightSchema);
export default InsightModel;

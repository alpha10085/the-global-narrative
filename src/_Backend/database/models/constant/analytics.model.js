import mongoose, { model, models } from "mongoose";

const Analyticschema = new mongoose.Schema(
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

const analyticsModel = models?.analytics || model("analytics", Analyticschema);
export default analyticsModel;

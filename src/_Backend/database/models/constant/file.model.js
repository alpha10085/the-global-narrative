import mongoose, { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    originalname: {
      type: String,
    },
    thumbnail:{
      type: String,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
export const fileModel = models?.file || model("file", schema);
export default fileModel;

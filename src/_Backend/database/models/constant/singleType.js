import { Schema, model, models } from "mongoose";
import { schemaCommens } from "./Commons";

const schema = new Schema(
  {
    key: {
      type: String,
      unique: true, // Ensure key is unique
      trim: true,
      required: true,
      minLength: [1, "too short category name"],
    },
    ...schemaCommens,
  },
  { timestamps: true }
);
export const SingleTypeModel =
  models?.singletype || model("singletype", schema);

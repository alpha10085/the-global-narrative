import mongoose, { Schema, model, models } from "mongoose";
import { mongtext, schemaCommens } from "./constant/Commons";

const newsCategorySchema = new Schema(
  {
    slug: mongtext, 
    title: mongtext, 
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

export const newsCategoryModel =
  models?.newsCategory || model("newsCategory", newsCategorySchema);

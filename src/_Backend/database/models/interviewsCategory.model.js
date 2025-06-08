import mongoose, { Schema, model, models } from "mongoose";
import { mongtext, schemaCommens } from "./constant/Commons";

const interviewCategorySchema = new Schema(
  {
    slug: mongtext,
    title: mongtext,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

export const interviewCategoryModel =
  models?.interviewCategory ||
  model("interviewCategory", interviewCategorySchema);

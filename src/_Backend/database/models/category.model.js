import mongoose, { Schema, model, models } from "mongoose";

import {
  mongtext,
  mongeDescription,
  poster,
  schemaCommens,
  ObjectId,
  mainCard,
  populateCommons,
} from "./Commons";

const categorySchema = new Schema(
  {
    ...mainCard,
    slug: mongtext,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);
categorySchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "poster",
    },
  ];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const categoryModel =
  models?.category || model("category", categorySchema);

import mongoose, { Schema, model, models } from "mongoose";
import {
  mongtext,
  populateCommons,
  poster,
  schemaCommens,
} from "./constant/Commons";

const testimonialSchema = new Schema(
  {
    content: mongtext,
    jobTitle: mongtext,
    author: mongtext,
    poster,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

testimonialSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "poster",
    },
  ];

  this.populate(populatePipeline);
  next();
});

export const testimonialModel =
  models?.testimonial || model("testimonial", testimonialSchema);

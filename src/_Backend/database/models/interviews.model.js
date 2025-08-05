import mongoose, { Schema, model, models } from "mongoose";
import {
  mongeDescription,
  mongtext,
  populateCommons,
  schemaCommens,
} from "./constant/Commons";

const interviewSchema = new Schema(
  {
    title: mongtext,
    link: mongeDescription,

    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

// Auto-populate category
interviewSchema.pre(/^find/, function (next) {
  const populatePipeline = [

  ];
  this.populate(populatePipeline);
  next();
});

export const interviewModel =
  models?.interview || model("interview", interviewSchema);

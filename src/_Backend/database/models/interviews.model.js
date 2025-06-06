import mongoose, { Schema, model, models } from "mongoose";
import { mongeDescription, mongtext, schemaCommens } from "./constant/Commons";

const interviewSchema = new Schema(
  {
    title: mongtext,
    link: mongeDescription,
    category: {
      type: Schema.Types.ObjectId,
      ref: "interviewCategory",
    },
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

// Auto-populate category
interviewSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "category",
    },
  ];
  this.populate(populatePipeline);
  next();
});

export const interviewModel =
  models?.interview || model("interview", interviewSchema);

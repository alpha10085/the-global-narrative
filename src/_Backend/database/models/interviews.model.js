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
      model: "interviewCategory",
      path: "category",
      options: { strictPopulate: false },
      select: "_id title",
    },
  ];
  this.populate(populatePipeline);
  next();
});

export const interviewModel =
  models?.interview || model("interview", interviewSchema);

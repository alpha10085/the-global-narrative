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
  const isRelation = this.options.relation || false;
  const populatePipeline = [];
  if (!isRelation) {
    populatePipeline.push({
      model: "interviewCategory",
      path: "category",
      options: { strictPopulate: false },
      select: "_id title slug",
    });
  }
  this.populate(populatePipeline);
  next();
});

export const interviewModel =
  models?.interview || model("interview", interviewSchema);

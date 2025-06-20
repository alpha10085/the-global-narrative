import { Schema, model, models } from "mongoose";
import {
  mongeDescription,
  mongtext,
  populateCommons,
  poster,
  schemaCommens,
} from "./constant/Commons";

const serviceSchema = new Schema(
  {
    title: mongtext,
    poster,
    subTitle: mongtext,
    description: mongeDescription,
    keyPoints: mongtext,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "poster",
    },
  ];
  this.populate(populatePipeline);
  next();
});

export const serviceModel = models?.service || model("service", serviceSchema);

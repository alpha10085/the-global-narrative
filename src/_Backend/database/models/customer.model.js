import mongoose, { Schema, model, models } from "mongoose";

import {
  mongtext,
  mongeDescription,
  poster,
  schemaCommens,
  ObjectId,
  populateCommons,
} from "./Commons";

const customerSchema = new Schema(
  {
    title: mongtext,
    logo: poster,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);
customerSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "logo",
    },
  ];

  this.populate(populatePipeline);
  next();
});

export const customerModel =
  models?.customer || model("customer", customerSchema);

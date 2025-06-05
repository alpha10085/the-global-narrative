import mongoose, { Schema, model, models } from "mongoose";
import { mongeDescription, mongtext, schemaCommens } from "./constant/Commons";

const serviceSchema = new Schema(
  {
    title: mongtext,
    intro: mongtext,
    description: mongeDescription,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre(/^find/, function (next) {
  next();
});

export const serviceModel = models?.service || model("service", serviceSchema);

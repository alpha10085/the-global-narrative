import mongoose, { Schema, model, models } from "mongoose";
import { poster, schemaCommens } from "./constant/Commons";


const clientsSchema = new Schema(
  {
    logo: poster,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);
clientsSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "logo",
    },
  ];

  this.populate(populatePipeline);
  next();
});

export const clientModel =
  models?.client || model("client", clientsSchema);

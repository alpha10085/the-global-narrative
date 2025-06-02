import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
} from "../Commons";

// Main schema for customerPage page
const customerPageSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  description: mongtext,
});

// Pre-hook to populate metadata fields
customerPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const customerPageModel =
  models?.customerPage ||
  SingleTypeModel.discriminator("customerPage", customerPageSchema);

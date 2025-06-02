import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
} from "../Commons";

// Main schema for productsPage page
const productsPageSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  description: mongtext,
});

// Pre-hook to populate metadata fields
productsPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const productsPageModel =
  models?.productsPage ||
  SingleTypeModel.discriminator("productsPage", productsPageSchema);

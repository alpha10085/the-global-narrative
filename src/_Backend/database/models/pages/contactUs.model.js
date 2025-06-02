import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
} from "../Commons";

// Main schema for contactUsPage page
const contactUsPageSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  description: mongtext,
});

// Pre-hook to populate metadata fields
contactUsPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const contactUsPageModel =
  models?.contactUsPage ||
  SingleTypeModel.discriminator("contactUsPage", contactUsPageSchema);

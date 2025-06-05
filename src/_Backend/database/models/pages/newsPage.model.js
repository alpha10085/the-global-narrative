import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
} from "../constant/Commons";

// Main schema for newsPage page
const newsPageSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  subTitle: mongtext,
});

// Pre-hook to populate metadata fields
newsPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const newsPageModel =
  models?.newsPage ||
  SingleTypeModel.discriminator("newsPage", newsPageSchema);

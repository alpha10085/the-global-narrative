import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
} from "../constant/Commons";

// Main schema for interviews page
const interviewsSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  subTitle: mongtext,
});

// Pre-hook to populate metadata fields
interviewsSchema.pre(/^find/, function (next) {
  const populatePipeline = [];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const interviewsModel =
  models?.interviews ||
  SingleTypeModel.discriminator("interviews", interviewsSchema);

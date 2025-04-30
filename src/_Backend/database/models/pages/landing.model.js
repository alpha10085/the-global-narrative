import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  media,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,

} from "../Commons";

const maincard = {
  title: mongtext,
  description: mongtext,
};

const heroSection = new Schema({
  ...maincard,
});
// Main schema for landing page
const landingSchema = new Schema({
  metadata: pageMetadata,
  heroSection,
});

// Pre-hook to populate metadata fields
landingSchema.pre(/^find/, function (next) {
  const populatePipeline = [pageMetadataPopulate];
  if (this?.options?.admin) {
    populatePipeline.push();
  }

  this.populate(populatePipeline);
  next();
});

export const landingPageModel =
  models?.landing || SingleTypeModel.discriminator("landing", landingSchema);

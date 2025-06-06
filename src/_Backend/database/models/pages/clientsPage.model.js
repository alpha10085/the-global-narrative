import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
} from "../constant/Commons";

// Main schema for clientsPage page
const clientsPageSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  description: mongtext,
});

// Pre-hook to populate metadata fields
clientsPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const clientsPageModel =
  models?.clientsPage ||
  SingleTypeModel.discriminator("clientsPage", clientsPageSchema);

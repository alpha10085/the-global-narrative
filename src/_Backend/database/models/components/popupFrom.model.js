import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
  populateCommons,
} from "../Commons";

// Main schema for popupFrom page
const popupFromSchema = new Schema({
  ...mainCard,
});

// Pre-hook to populate fields
popupFromSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      ...populateCommons,
      path: "poster",
    },
  ];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const popupFromComponentModel =
  models?.popupFrom ||
  SingleTypeModel.discriminator("popupFrom", popupFromSchema);

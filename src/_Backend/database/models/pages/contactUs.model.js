import { Schema, models } from "mongoose";
import { mongeDescription, mongtext, pageMetadata } from "../constant/Commons";
import { SingleTypeModel } from "../constant/singleType";

// Main schema for contactUsPage page
const contactUsPageSchema = new Schema({
  metadata: pageMetadata,
  title: mongtext,
  description: mongeDescription,
  information: {
    address: mongeDescription, 
    phone: mongtext,
    email: mongtext,
  },
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

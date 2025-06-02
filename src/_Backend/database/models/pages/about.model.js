import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
  populateCommons,
} from "../Commons";

const heroSection = new Schema({
  left: mainCard,
  right: mainCard,
});
const aboutSection = new Schema({
  ...mainCard,
});
const ourServicesSection = new Schema({
  ...mainCard,
  services: [
    {
      title: mongtext,

      description: mongtext,
    },
  ],
});
const whyUsSection = new Schema({
  title: mongtext,
  description: mongtext,
  cards: [
    {
      title: mongtext,
      description: mongtext,
    },
  ],
});
// Main schema for aboutUs page
const aboutUsSchema = new Schema({
  metadata: pageMetadata,
  heroSection,
  aboutSection,
  whyUsSection,
  ourServicesSection,
});

// Pre-hook to populate metadata fields
aboutUsSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "heroSection.left.poster",
    },
    {
      ...populateCommons,
      path: "heroSection.right.poster",
    },
    {
      ...populateCommons,
      path: "aboutSection.poster",
    },
    {
      ...populateCommons,
      path: "ourServicesSection.poster",
    },
  ];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }
  this.populate(populatePipeline);
  next();
});

export const aboutUsPageModel =
  models?.aboutUs || SingleTypeModel.discriminator("aboutUs", aboutUsSchema);

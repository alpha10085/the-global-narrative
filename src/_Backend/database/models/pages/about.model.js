import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import {
  mongeDescription,
  mongtext,
  pageMetadata,
  pageMetadataPopulate,
  populateCommons,
  poster,
} from "../constant/Commons";


// hero section
const heroSection = new Schema({
  title: mongtext,
  description: mongeDescription,
  poster,
});
// ourValues
const ourValues = new Schema({
  title: mongtext,
  cards: [
    {
      title: mongtext,
      description: mongeDescription,
    },
  ],
});
// aboutUs
const aboutUs = new Schema({
  title: mongtext,
  description: mongeDescription,
});
// quoteSection
const quoteSection = new Schema({
  title: mongtext,
  description: mongeDescription,
});
// Main about us schema
const aboutUsSchema = new Schema({
  metadata: pageMetadata,
  hero: heroSection,
  ourValues,
  aboutUs,
  quoteSection,
});

// Pre-hook to populate metadata and images
aboutUsSchema.pre(/^find/, function (next) {
  this.populate([
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "hero.poster",
    },

  ]);
  next();
});

export const aboutUsPageModel =
  models?.aboutUs || SingleTypeModel.discriminator("aboutUs", aboutUsSchema);

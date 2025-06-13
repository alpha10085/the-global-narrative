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
// joinUs
const joinUs = new Schema({
  title: mongtext,
  description: mongeDescription,
});
// quoteSection
const quoteSection = new Schema({
  title: mongtext,
  description: mongeDescription,
});
// Main about us schema
const joinUsSchema = new Schema({
  metadata: pageMetadata,
  hero: heroSection,
  ourValues,
  joinUs,
  quoteSection,
});

// Pre-hook to populate metadata and images
joinUsSchema.pre(/^find/, function (next) {
  this.populate([
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "hero.poster",
    },
  ]);
  next();
});

export const joinUsPageModel =
  models?.joinUs || SingleTypeModel.discriminator("joinUs", joinUsSchema);

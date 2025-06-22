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

// Who Us Member schema
const whoUsMember = new Schema({
  name: mongtext,
  jobTitle: mongtext,
  description: mongeDescription,
  image: poster,
});
// whoUsSectionSection
const whoUsSectionSection = new Schema({
  title: mongtext,
  members: [whoUsMember],
});

// ourValues
const ourValues = new Schema({
  title: mongtext,
  cards: [
    {
      title: mongtext,
      description: mongeDescription,
      poster,
    },
  ],
});
// Mission-Vision
const missionVision = new Schema({
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
  whoUsSectionSection,
  ourValues,
  missionVision,
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
    {
      path: "whoUsSectionSection.members.image",
      ...populateCommons,
    },
    {
      path: "ourValues.cards.poster",
      ...populateCommons,
    },
  ]);
  next();
});

export const aboutUsPageModel =
  models?.aboutUs || SingleTypeModel.discriminator("aboutUs", aboutUsSchema);

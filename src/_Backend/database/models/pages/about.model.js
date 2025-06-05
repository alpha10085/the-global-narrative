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


// Who Us Member schema
const whoUsMember = new Schema({
  name: mongtext,
  jobTitle: mongtext,
  description: mongeDescription,
  image: poster,
});

// Our Value Card schema
const ourValueCard = new Schema({
  title: mongtext,
  description: mongeDescription,
});


// Hero section schema
const heroSection = new Schema({
  title: mongtext,
  description: mongeDescription,
  poster,
});

// Our Value Section schema
const ourValueSection = new Schema({
  title: mongtext,
  cards: [ourValueCard],
});

// Who Us Section schema
const whoUsSectionSection = new Schema({
  title: mongtext,
  members: [whoUsMember],
});

// Main about us schema
const aboutUsSchema = new Schema({
  metadata: pageMetadata,
  hero: heroSection,
  ourValueSection,
  whoUsSectionSection
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
  ]);
  next();
});

export const aboutUsPageModel =
  models?.aboutUs || SingleTypeModel.discriminator("aboutUs", aboutUsSchema);

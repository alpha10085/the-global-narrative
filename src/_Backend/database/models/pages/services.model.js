import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import {
  mongeDescription,
  mongtext,
  ObjectId,
  pageMetadata,
  pageMetadataPopulate,
  populateCommons,
  poster,
} from "../constant/Commons";

const serviceCardSchema = new Schema({
  title: mongtext,
  poster,
  description: mongeDescription,
});

const servicesPageSchema = new Schema(
  {
    metadata: pageMetadata,
    hero: {
      title: mongtext,
      description: mongeDescription,
      poster,
    },
    ourValueSection: {
      title: mongtext,
      cards: [serviceCardSchema],
    },
    quoteSection: {
      title: mongtext,
      description: mongeDescription,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-hook to populate poster, services, and faqs
servicesPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "hero.poster",
    },
    {
      ...populateCommons,
      path: "ourValueSection.cards.poster",
    },
  ];
  this.populate(populatePipeline);
  next();
});

export const servicesPageModel =
  models?.services ||
  SingleTypeModel.discriminator("services", servicesPageSchema);

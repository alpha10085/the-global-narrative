import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
  ObjectId,
  populateCommons,
} from "../Commons";
import { categoryModel } from "../category.model";
import { productModel } from "../product.model";
const heroSection = new Schema({
  mediaSection: { poster, title: String, subTitle: String },
  title: String,
  description: String,
});
const qualitySection = new Schema({
  ...mainCard,
});
const categoriesSection = new Schema({
  title: String,
  largeCard: {
    type: ObjectId,
    ref: "category",
  },
  smallCards: [
    {
      type: ObjectId,
      ref: "category",
    },
  ],
});
const locationSection = new Schema({
  title: mongtext,
  address: mongtext,
  location_url: mongtext,
  map_url: mongtext,
});
// Main schema for landing page
const landingSchema = new Schema({
  metadata: pageMetadata,
  heroSection,
  qualitySection,
  locationSection,
  featuredProducts: [{ type: ObjectId, ref: "product" }],
  categoriesSection,
});

// Pre-hook to populate metadata fields
landingSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "heroSection.mediaSection.poster",
    },
    {
      ...populateCommons,
      path: "qualitySection.poster",
    },
    {
      model: "category",
      path: "categoriesSection.largeCard",
      options: { strictPopulate: false },
      select: "_id poster title", // Example fields to select from the 'color' model
    },
    {
      model: "category",
      path: "categoriesSection.smallCards",
      options: { strictPopulate: false },
      select: "_id poster title", // Example fields to select from the 'color' model
    },
  ];
  if (this?.options?.admin) {
    populatePipeline.push({
      model: "product",
      path: "featuredProducts",
      options: { strictPopulate: false, relation: true },
      select: {
        _id: 1,
        poster: 1,
        title: 1,
      },
    });
  }

  this.populate(populatePipeline);
  next();
});

export const landingPageModel =
  models?.landing || SingleTypeModel.discriminator("landing", landingSchema);

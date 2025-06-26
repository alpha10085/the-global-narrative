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
import { newsModel } from "../news.model";
import { testimonialModel } from "../testimonial.model";

// Hero section schema
const heroItemSchema = new Schema({
  title: mongtext,
  media: poster,
  thumbnail: poster,
  description: mongeDescription,
  button: {
    label: mongtext,
    link: mongtext,
  },
});

// About Us section
const aboutUsSection = new Schema({
  title: mongtext,
  description: mongeDescription,
});

// services section
const servicesSection = new Schema({
  title: mongtext,
  services: [{ type: Schema.Types.ObjectId, ref: "service" }],
});

// Quote section
const quoteSection = new Schema({
  title: mongtext,
  content: mongeDescription,
  poster,
});

// News section
const newsSection = new Schema({
  title: mongtext,
  posts: [{ type: Schema.Types.ObjectId, ref: "news" }],
});

// Testimonial section
const testimonialSection = new Schema({
  title: mongtext,
  posts: [{ type: Schema.Types.ObjectId, ref: "testimonial" }],
});

// Get In Touch section
const getInTouchSection = new Schema({
  title: mongtext,
  description: mongeDescription,
  poster,
});

// Main home page schema
const landingSchema = new Schema({
  metadata: pageMetadata,
  heroSection: heroItemSchema,
  aboutUsSection,
  servicesSection,
  quoteSection,
  newsSection,
  testimonialSection,
  getInTouchSection,
});

// Auto-populate
landingSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "heroSection.media",
    },
    {
      ...populateCommons,
      path: "heroSection.thumbnail",
    },
    {
      ...populateCommons,
      path: "getInTouchSection.poster",
    },
    {
      ...populateCommons,
      path: "quoteSection.poster",
    },
  ];
  if (this?.options?.admin) {
    populatePipeline.push(
      ...[
        {
          path: "newsSection.posts",
          model: "news",
          select: {
            _id: 1,
            poster: 1,
            title: 1,
            date: 1,
            slug: 1,
          },
        },
        {
          path: "testimonialSection.posts",
          model: "testimonial",
          select: {
            _id: 1,
            author: 1,
            jobTitle: 1,
            content: 1,
            poster: 1,
          },
        },
        {
          path: "servicesSection.services",
          model: "service",
          select: {
            _id: 1,
            title: 1,
            poster: 1,
            description: 1,
          },
        },
      ]
    );
  }

  this.populate(populatePipeline);

  next();
});

export const landingModel =
  models?.landing || SingleTypeModel.discriminator("landing", landingSchema);

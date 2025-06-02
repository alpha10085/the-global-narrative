import mongoose, { Schema, model, models } from "mongoose";

import {
  mongtext,
  mongeDescription,
  poster,
  schemaCommens,
  ObjectId,
  populateCommons,
} from "./Commons";
import { categoryModel } from "./category.model";

const productSchema = new Schema(
  {
    title: mongtext,
    description: mongeDescription,
    slug: mongtext,
    price: Number,
    discount: Number,
    poster,
    assets: {
      mainPoster: poster,
      images: [poster],
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);
// Pre-hook to populate metadata fields
productSchema.pre(/^find/, function (next) {
  const isRelation = this.options.relation || false;
  const populatePipeline = [
    {
      ...populateCommons,
      path: "poster",
    },
  ];
  if (!isRelation) {
    populatePipeline.push(
      {
        ...populateCommons,
        path: "assets.images",
      },
      {
        ...populateCommons,
        path: "assets.mainPoster",
      },
      {
        model: "category",
        path: "category",
        options: { strictPopulate: false },
        select: "_id title slug", // Example fields to select from the 'color' model
      }
    );
  }

  this.populate(populatePipeline);
  next();
});
export const productModel = models?.product || model("product", productSchema);

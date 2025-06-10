import mongoose, { Schema, model, models } from "mongoose";
import {
  mongeDescription,
  mongtext,
  populateCommons,
  poster,
  schemaCommens,
} from "./constant/Commons";

const newsSchema = new Schema(
  {
    slug: mongtext,
    title: mongtext,
    poster,
    content: mongeDescription,
    category: {
      type: Schema.Types.ObjectId,
      ref: "newsCategory",
    },
    date: Date,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

newsSchema.pre(/^find/, function (next) {
  const isRelation = this.options.relation || false;
  const populatePipeline = [
    {
      ...populateCommons,
      path: "poster",
    },
  ];
  if (!isRelation) {
    populatePipeline.push({
      model: "newsCategory",
      path: "category",
      options: { strictPopulate: false },
      select: "_id title slug",
    });
  }
  this.populate(populatePipeline);
  next();
});

export const newsModel = models?.news || model("news", newsSchema);

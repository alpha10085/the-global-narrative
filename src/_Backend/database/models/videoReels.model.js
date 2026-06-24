// videoReelsModel
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
    thumbnail: poster,
    video: poster,
    ...schemaCommens,
  },
  {
    timestamps: true,
  },
);

newsSchema.pre(/^find/, function (next) {
  const isRelation = this.options.relation || false;
  const populatePipeline = [
    {
      ...populateCommons,
      path: "thumbnail",
    },
    {
      ...populateCommons,
      path: "video",
    },
  ];
  this.populate(populatePipeline);
  next();
});

export const videoReelsModel =
  models["video-reels"] || model("video-reels", newsSchema);

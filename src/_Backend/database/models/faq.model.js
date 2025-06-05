import mongoose, { Schema, model, models } from "mongoose";
import { mongeDescription, mongtext, schemaCommens } from "./constant/Commons";

const faqSchema = new Schema(
  {
    question: mongtext,
    answer: mongeDescription,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);

faqSchema.pre(/^find/, function (next) {
  next();
});

export const faqModel = models?.faq || model("faq", faqSchema);

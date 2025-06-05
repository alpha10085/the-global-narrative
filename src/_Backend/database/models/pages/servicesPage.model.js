import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import { mongeDescription, mongtext, ObjectId, poster } from "../constant/Commons";


// Refs to existing models
const servicesPageSchema = new Schema({
  title: mongtext,
  description: mongtext,
  poster,
  services: [{ type: ObjectId, ref: "services" }],
  contactSection: {
    title: mongtext,
    description: mongeDescription,
  },
});

// Pre-hook to populate poster, services, and faqs
servicesPageSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "poster",
      ...populateCommons,
    },
    {
      path: "services",
      ...populateCommons,
    },
  ]);
  next();
});

export const servicesPageModel =
  models?.servicesPage ||
  SingleTypeModel.discriminator("servicesPage", servicesPageSchema);

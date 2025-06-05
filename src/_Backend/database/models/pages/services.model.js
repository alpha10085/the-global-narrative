import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import { mongeDescription, mongtext, ObjectId, poster } from "../constant/Commons";


const serviceSubSchema = new Schema({
  title: mongtext,
  intro: mongtext,
  description: mongeDescription,
}); 

const servicesPageSchema = new Schema({
  title: mongtext,
  description: mongeDescription,
  poster,
  services: [serviceSubSchema],
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
  ]);
  next();
});

export const servicesPageModel =
  models?.services ||
  SingleTypeModel.discriminator("services", servicesPageSchema);

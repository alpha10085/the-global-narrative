import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../singleType";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
  populateCommons,
} from "../Commons";

// Main schema for popupFrom page
const footerSchema = new Schema({
  heading: mongtext,
  description: mongtext,
  buttonText: mongtext,
  socialLinks: [
    {
      url: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});



export const footerComponentModel =
  models?.footer || SingleTypeModel.discriminator("footer", footerSchema);

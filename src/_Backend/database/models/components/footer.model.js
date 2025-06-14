import { Schema, models } from "mongoose";
import {
  poster,
  pageMetadataPopulate,
  pageMetadata,
  mongtext,
  mainCard,
  populateCommons,
  mongeDescription
} from "../constant/Commons";
import { SingleTypeModel } from "../constant/singleType";

// Main schema for popupFrom page
const footerSchema = new Schema({
  socialLinks: [
    {
      url: mongeDescription,
      link: mongeDescription,
    },
  ],
});



export const footerComponentModel =
  models?.footer || SingleTypeModel.discriminator("footer", footerSchema);

import { Schema, model, models } from "mongoose";
import { mongeDescription, mongtext } from "./constant/Commons";

const contactUsSchema = new Schema(
  {
    name: mongtext,
    email: mongtext,
    phone: mongtext,
    message: mongeDescription,
  },
  {
    timestamps: true,
  }
);

export const contactUsModel =
  models?.contactUs || model("contactUs", contactUsSchema);

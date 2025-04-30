import mongoose, { Schema, model, models } from "mongoose";

import { mongtext , mongeDescription, schemaCommens } from "./Commons";

const formSchema = new Schema(
  {
    name: mongtext,
    email: mongtext,
    message: mongeDescription,
    phone: mongtext,
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);



export const formModel = models?.form || model("form", formSchema);

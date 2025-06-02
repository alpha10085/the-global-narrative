import { model, models, Schema } from "mongoose";
import { mongtext, schemacommons } from "./Commons";

const errorLogSchema = new Schema(
  {
    message: mongtext,
    stack: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const errorLogModel =
  models?.errorLog || model("errorLog", errorLogSchema);

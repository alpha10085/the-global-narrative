import { model, models, Schema } from "mongoose";
import { mongtext, schemacommons } from "./Commons";

const errorLogSchema = new Schema(
  {
    message: mongtext,
    stack: {
      type: String,
      default: null,
    },
    location: {
           type: String,
      default: "unknown",
    },
    Browser: {
      type: String,
      default: "unknown",
    },
    os : {
            type: String,
      default: "unknown",
    }
  },
  {
    timestamps: true,
  }
);

export const errorLogModel =
  models?.errorLog || model("errorLog", errorLogSchema);

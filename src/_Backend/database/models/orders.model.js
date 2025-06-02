import { Schema, model, models } from "mongoose";

import { mongtext, mongeDescription, schemaCommens, ObjectId } from "./Commons";

const ordersSchema = new Schema(
  {
    name: mongtext,
    email: mongtext,
    message: mongeDescription,
    phone: mongtext,
    items: [
      {
        product: {
          type: ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    ...schemaCommens,
  },
  {
    timestamps: true,
  }
);
// Pre-hook to populate metadata fields
ordersSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    {
      model: "product",
      path: "items.product",
      options: { strictPopulate: false },
      select: "_id pooster title slug", // Example fields to select from the 'color' model
    },
  ];
  if (this?.options?.admin) {
    //populatePipeline.push();
  }

  this.populate(populatePipeline);
  next();
});

export const ordersModel = models?.orders || model("orders", ordersSchema);

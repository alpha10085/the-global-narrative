import { Schema, models } from "mongoose";
import { SingleTypeModel } from "../constant/singleType";
import {
  mongeDescription,
  mongtext,
  ObjectId,
  pageMetadata,
  pageMetadataPopulate,
  populateCommons,
  poster,
} from "../constant/Commons";

const servicesPageSchema = new Schema(
  {
    metadata: pageMetadata,
    hero: {
      title: mongtext,
      description: mongeDescription,
      poster,
    },
    ourValueSection: {
      title: mongtext,
      cards: [{ type: Schema.Types.ObjectId, ref: "service" }],
    },
    quoteSection: {
      title: mongtext,
      description: mongeDescription,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-hook to populate poster, services, and faqs
servicesPageSchema.pre(/^find/, function (next) {
  const populatePipeline = [
    pageMetadataPopulate,
    {
      ...populateCommons,
      path: "hero.poster",
    },
  ];
  if (this?.options?.admin) {
    populatePipeline.push(
      ...[
        {
          path: "ourValueSection.cards",
          model: "service",
          select: {
            _id: 1,
            title: 1,
            poster: 1,
            description: 1,
          },
        },
      ]
    );
  }

  this.populate(populatePipeline);
  next();
});

export const servicesPageModel =
  models?.services ||
  SingleTypeModel.discriminator("services", servicesPageSchema);

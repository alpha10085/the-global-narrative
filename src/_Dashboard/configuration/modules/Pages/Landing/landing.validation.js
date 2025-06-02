import Joi from "joi";
import {
  commonVal,
  fileVal,
  pageMetadataValClient,
} from "../../../../commens/validation";
import {
  joiArray,
  joiObject,
  joiText,
  messagesHandlers,
} from "@/_Dashboard/utils/JoiHandlers";
import CategoryValidationSchema from "../../collections/category/category.validation";

const mainCard = (locale = "en") => {
  return {
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: true,
    }),
    description: joiText({
      locale,
      max: 20000,
      min: 2,
      required: true,
    }),
    poster: fileVal.required().messages(
      messagesHandlers({
        locale,
        type: "object",
      })
    ),
    
  ...commonVal,
  };
};
export const LandingvalidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    heroSection: joiObject({
      body: {
        title: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
        description: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
        mediaSection: joiObject({
          body: {
            title: joiText({
              locale,
              max: 20000,
              min: 2,
              required: true,
            }),
            subTitle: joiText({
              locale,
              max: 20000,
              min: 2,
              required: true,
            }),
            poster: fileVal.required().messages(
              messagesHandlers({
                locale,
                type: "object",
              })
            ),
            
          },
          locale,
          required: true,
        }),
      },
      locale,
      required: true,
    }),
    qualitySection: joiObject({
      body: mainCard(locale),
      locale,
      required: true,
    }),
    categoriesSection: joiObject({
      body: {
        title: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
        largeCard: CategoryValidationSchema(locale,true),
        smallCards: Joi.array().items(CategoryValidationSchema(locale,true)),
      },
      locale,
      required: true,
    }),
    featuredProducts:Joi.array().items(),
    locationSection: joiObject({
      body: {
        title: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
        address: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
        location_url: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
        map_url: joiText({
          locale,
          max: 20000,
          min: 2,
          required: true,
        }),
      },
      locale,
      required: true,
    }),
    ...commonVal,
  });
};

export default LandingvalidationSchema;

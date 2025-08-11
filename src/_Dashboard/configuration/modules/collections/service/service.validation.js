import Joi from "joi";
import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import {
  joiArray,
  joiObject,
  joiText,
  messagesHandlers,
} from "@/_Dashboard/utils/JoiHandlers";

const serviceSchemaValidation = (locale = "en", relation = false) => {
  return Joi.object({
    title: joiText({
      locale,
      min: 2,
      max: 20000,
      required: !relation,
    }),
    subTitle: joiText({
      locale,
      min: 2,
      max: 20000,
      required: !relation,
    }),
    keyPoints: joiText({
      locale,
      min: 2,
      max: 20000,
      required: false,
    }),

    publish: Joi.boolean().default(false),

    poster: relation
      ? Joi.any()
      : fileVal.required().messages(
          messagesHandlers({
            locale,
            type: "object",
          })
        ),

    description: joiText({
      locale,
      min: 2,
      max: 100000,
      required: !relation,
    }),
    projects: Joi.array()
      .items(
        joiObject({
          body: {
            link: joiText({ min: 2, max: 1000, required: !relation }),
            poster: relation ? fileVal : fileVal.required(),
          },
          required: false,
          locale,
        })
      )
      .allow(null)
      .optional(),

    ...commonVal,
  });
};

export default serviceSchemaValidation;

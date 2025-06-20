import Joi from "joi";
import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";

const serviceSchemaValidation = (locale = "en", relation = false) => {
  return Joi.object({
    title: joiText({
      locale,
      min: 2,
      max: 20000,
      required: !relation,
    }),
    subTitle:joiText({
      locale,
      min: 2,
      max: 20000,
      required: !relation,
    }),
    keyPoints:joiText({
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

    ...commonVal,
  });
};

export default serviceSchemaValidation;

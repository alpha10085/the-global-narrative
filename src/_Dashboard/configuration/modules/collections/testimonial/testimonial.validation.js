import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";

const TestimonialValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    content: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    jobTitle: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    author: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    poster: (relation ? fileVal.allow(null) : fileVal.required()).messages(
      messagesHandlers({
        locale,
        type: "object",
      })
    ),
    publish: Joi.boolean().default(false),
    ...commonVal,
  });
};

export default TestimonialValidationSchema;

import Joi from "joi";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import { commonVal, fileVal } from "../../../../commens/validation";

export const CategoryValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    description: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    poster: (relation ? fileVal.allow(null) : fileVal.required()).messages(
      messagesHandlers({ locale, type: "object" })
    ),
    ...commonVal,
  });
};


export default CategoryValidationSchema;

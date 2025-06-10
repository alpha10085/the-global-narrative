import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";
import NewsCategoryValidationSchema from "../newsCategory/newsCategory.validation";

const NewsValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    title: joiText({
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
    content: joiText({
      locale,
      max: 100000,
      min: 2,
      required: !relation,
    }),
    category: relation
      ? NewsCategoryValidationSchema(locale, true).optional().allow(null)
      : NewsCategoryValidationSchema(locale, true).required(),
    date: joiText({
      locale,
      max: 100000,
      min: 2,
      required: !relation,
    }),
    publish: Joi.boolean().default(false),
    ...commonVal,
  });
};

export default NewsValidationSchema;

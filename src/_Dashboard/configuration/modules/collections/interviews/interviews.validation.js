import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";
import interviewsCategoryValidationSchema from "../interviewsCategory/interviewsCategory.validation";

const InterviewsValidationSchema = (locale = "en", relation = false) => {
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
      ? interviewsCategoryValidationSchema(locale, true)
      : interviewsCategoryValidationSchema(locale, true).required(),
    date: Joi.date().required(),
    publish: Joi.boolean().default(false),
    ...commonVal,
  });
};

export default InterviewsValidationSchema;

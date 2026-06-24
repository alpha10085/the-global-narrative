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
    thumbnail: (relation ? fileVal.allow(null) : fileVal.required()).messages(
      messagesHandlers({
        locale,
        type: "object",
      })
    ),
        video: (relation ? fileVal.allow(null) : fileVal.required()).messages(
      messagesHandlers({
        locale,
        type: "object",
      })
    ),
    ...commonVal,
  });
};

export default InterviewsValidationSchema;

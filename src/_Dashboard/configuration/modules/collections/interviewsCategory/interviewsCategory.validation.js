import { commonVal } from "@/_Dashboard/commens/validation";
import { joiText } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";

const interviewsCategoryValidationSchema = (
  locale = "en",
  relation = false
) => {
  return Joi.object({
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    publish: Joi.boolean().default(false),
    ...commonVal,
  });
};

export default interviewsCategoryValidationSchema;

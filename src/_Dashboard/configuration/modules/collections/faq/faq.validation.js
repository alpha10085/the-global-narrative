import { commonVal } from "@/_Dashboard/commens/validation";
import { joiText } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";

const FaqValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    question: joiText({
      locale,
      max: 20000,
      min: 2,
       required: !relation,
    }),
    answer: joiText({
      locale,
      max: 100000,
      min: 2,
       required: !relation,
    }),
    publish: Joi.boolean().default(false),
       ...commonVal,
  });
};

export default FaqValidationSchema;

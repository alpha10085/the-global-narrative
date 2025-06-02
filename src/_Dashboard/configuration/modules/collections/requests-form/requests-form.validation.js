import Joi from "joi";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import { commonVal, fileVal } from "../../../../commens/validation";

export const requestsFormValidationSchema = (locale = "en") => {
  return Joi.object({
    name: joiText({
      min: 3,
      max: 5000,
      required: true,
      locale,
    }),
    email: joiText({
      min: 3,
      max: 5000,
      required: true,
      email: true,
      locale,
    }),
    message: joiText({
      min: 3,
      max: 5000,
      required: true,
      locale,
    }),
    phone: joiText({
      min: 3,
      max: 5000,
      required: true,
      locale,
    }),
    ...commonVal,
  });
};

export default requestsFormValidationSchema;

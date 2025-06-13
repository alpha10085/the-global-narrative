import { commonVal } from "@/_Dashboard/commens/validation";
import { joiText } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";


const ContactFormValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    name: joiText({
      locale,
      min: 2,
      max: 20000,
      required: !relation,
    }),
    email: joiText({
      locale,
      min: 5,
      max: 20000,
      required: !relation,
    }),
    phone: joiText({
      locale,
      min: 4,
      max: 20,
      required: !relation,
    }),
    message: joiText({
      locale,
      min: 2,
      max: 100000,
      required: !relation,
    }),
    ...commonVal,
  });
};

export default ContactFormValidationSchema;

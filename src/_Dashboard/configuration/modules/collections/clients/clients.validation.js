import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";

const clientsValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    logo: (relation ? fileVal.required() : fileVal).messages(
      messagesHandlers({ locale, type: "object" })
    ),
    publish: Joi.boolean().default(false),
    ...commonVal,
  });
};

export default clientsValidationSchema;

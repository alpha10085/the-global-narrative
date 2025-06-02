import Joi from "joi";
import {
  commonVal,
  fileVal,
  pageMetadataValClient,
} from "../../../../commens/validation";
import { joiText, joiObject, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";

export const customerValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    logo: (relation ? fileVal.required() : fileVal).messages(
      messagesHandlers({ locale, type: "object" })
    ),
    ...commonVal,
  });
};

export default customerValidationSchema;

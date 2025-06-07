import Joi from "joi";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import { commonVal, pageMetadataValClient } from "@/_Dashboard/commens/validation";

const ContactPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),

    title: joiText({ locale, min: 2, max: 20000, required: true }),

    description: joiText({ locale, min: 2, max: 20000, required: true }),
    ...commonVal,
  });
};

export default ContactPageValidationSchema;

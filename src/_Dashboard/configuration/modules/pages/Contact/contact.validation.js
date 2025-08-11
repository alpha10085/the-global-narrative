import Joi from "joi";
import { joiObject, joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import {
  commonVal,
  pageMetadataValClient,
} from "@/_Dashboard/commens/validation";

const ContactPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),

    title: joiText({ locale, min: 2, max: 20000, required: true }),

    description: joiText({ locale, min: 2, max: 20000, required: true }),
  
    information: joiObject({
      required: true,
      locale,
      body: {
        address: joiText({
          locale,
          min: 2,
          max: 20000,
          required: false,
        }),
        phone: joiText({
          locale,
          min: 2,
          max: 100,
          required: false,
        }),
        email: joiText({
          locale,
          min: 5,
          max: 200,
          required: false,
          email: true,
        }),
      },
    }),
    ...commonVal,
  });
};

export default ContactPageValidationSchema;

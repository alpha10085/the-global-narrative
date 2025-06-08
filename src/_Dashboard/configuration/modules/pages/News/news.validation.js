import { commonVal, pageMetadataValClient } from "@/_Dashboard/commens/validation";
import { joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";

const NewsPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    title: joiText({ locale, min: 2, max: 20000, required: true }),
    subTitle: joiText({ locale, min: 2, max: 20000, required: true }),
    ...commonVal,
  });
};

export default NewsPageValidationSchema;

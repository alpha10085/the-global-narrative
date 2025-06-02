import Joi from "joi";
import {
  commonVal,
  fileVal,
  pageMetadataValClient,
} from "../../../../commens/validation";
import {
  joiArray,
  joiObject,
  joiText,
  messagesHandlers,
} from "@/_Dashboard/utils/JoiHandlers";

const mainCard = (locale = "en") =>
  Joi.object({
    title: joiText({
      locale,
      max: 13,
      min: 2,
      required: true,
    }),
    description: joiText({
      locale,
      max: 20000,
      min: 2,
      required: true,
    }),
    poster: fileVal.required().messages(
      messagesHandlers({
        locale,
        type: "object",
      })
    ),
    ...commonVal,
  });

export const popupFormValidationSchema = mainCard;

export default popupFormValidationSchema;

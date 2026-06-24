import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

const videoReelsValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 20000, required: true }),
  thumbnail: fileVal.required(),
  video: fileVal.required(),

  ...CommonsVal,
}).required();

// Update Validation
const videoReelsValidationUpdate = Joi.object({
  title: joiText({ max: 20000 }).optional(),
  thumbnail: fileVal.allow(null, ""),
  video: fileVal.allow(null, ""),

  ...CommonsVal,
});

// Relation Validation
const videoReelsValidationRelation = Joi.object({
  title: joiText({ max: 20000 }).optional(),
  thumbnail: fileVal.allow(null, ""),
  video: fileVal.allow(null, ""),

  ...CommonsVal,
});

export {
  videoReelsValidationCreate,
  videoReelsValidationUpdate,
  videoReelsValidationRelation,
};

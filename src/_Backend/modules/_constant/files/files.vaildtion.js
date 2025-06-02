import Joi from "joi";

const fileValidationSchema = Joi.object({
  filename: Joi.string().required(),
  public_id: Joi.string().required(),
  url: Joi.string().required(),
  path: Joi.string().required(),
});

const fileUpdateSchema = Joi.object({
  id: Joi.string().required(), // File ID to update
  filename: Joi.string().required(),
  public_id: Joi.string().required(),
  url: Joi.string().required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24),
});

const relationFileVal = Joi.object({
  _id: Joi.string().hex().length(24),
  filename: Joi.string(),
  public_id: Joi.string(),
  originalname: Joi.string(),
  filename: Joi.string(),
  url: Joi.string(),
  mimetype: Joi.string(),
  size: Joi.number(),
  thumbnail: Joi.string(),
});

const fileUploadTicketSchema = Joi.object({
  public_id: Joi.string().min(1).max(500).required(),
  url: Joi.string().min(1).max(500).required(),
  filename: Joi.string().min(1).max(500).required(),
  size: Joi.number().min(1).max(2000000000000).required(),
  mimetype: Joi.string().min(1).max(500).required(),
  thumbnail: Joi.string().min(1).max(500),
});


export {
  fileValidationSchema,
  fileUpdateSchema,
  paramsIdVal,
  relationFileVal,
  fileUploadTicketSchema,
};

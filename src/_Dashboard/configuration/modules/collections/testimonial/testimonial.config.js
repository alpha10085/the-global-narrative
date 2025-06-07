import testimonialSchema from "./testimonial.schema.json";
import TestimonialValidationSchema from "./testimonial.validation";

export const testimonialConfig = {
  displayName: "categories",
  key: "categories",
  type: "collections",
  schema: testimonialSchema,
  validation: TestimonialValidationSchema,
};

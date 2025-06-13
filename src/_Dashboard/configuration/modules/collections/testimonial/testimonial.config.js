import testimonialSchema from "./testimonial.schema.json";
import TestimonialValidationSchema from "./testimonial.validation";

export const testimonialConfig = {
  displayName: "testimonials",
  key: "testimonials",
  type: "collections",
  schema: testimonialSchema,
  validation: TestimonialValidationSchema,
};

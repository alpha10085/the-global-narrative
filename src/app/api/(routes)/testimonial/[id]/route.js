import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { testimonialModel } from "@/_Backend/database/models/testimonial.model";
import { testimonialValidationUpdate } from "@/_Backend/modules/testimonial/testimonial.validation";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";

const config = {
  model: testimonialModel,
  name: "testimonial",
  schemaValidation: testimonialValidationUpdate,
  allowedTo: [...enumRoles.adminRoles],
};
export const GET = FindOne({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
});
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);

import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { imageLookup } from "@/_Backend/commons/lookup";
import { testimonialValidationCreate } from "@/_Backend/modules/testimonial/testimonial.validation";
import { testimonialModel } from "@/_Backend/database/models/testimonial.model";

const config = {
  model: testimonialModel,
  name: "testimonial",
  options: {
    searchfields: ["content", "jobTitle", "author"],
  },
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
  pushToPipeLine: imageLookup("poster"),
});
export const POST = insertOne({
  schemaValidation: testimonialValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
});

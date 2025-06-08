import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";
import { faqModel } from "@/_Backend/database/models/faq.model";
import { faqValidationUpdate } from "@/_Backend/modules/faq/faq.validation";

const config = {
  model: faqModel,
  name: "faq",
  alloweTo: [enumRoles.adminRoles],
  schemaValidation: faqValidationUpdate,
};
export const GET = FindOne(config);
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);

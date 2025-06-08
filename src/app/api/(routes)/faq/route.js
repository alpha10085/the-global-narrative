import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { faqModel } from "@/_Backend/database/models/faq.model";
import { faqValidationCreate } from "@/_Backend/modules/faq/faq.validation";

const config = {
  model: faqModel,
  name: "faq",
  options: {
    searchFeilds: ["question", "answer"],
  },
};
export const GET = FindAll({
  ...config,
  alloweTo: [...enumRoles.adminRoles, "public"],
});
export const POST = insertOne({
  schemaValidation: faqValidationCreate,
  alloweTo: [enumRoles.adminRoles],
  ...config,
});

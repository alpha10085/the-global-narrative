import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { interviewCategoryModel } from "@/_Backend/database/models/interviewsCategory.model";
import { interviewsCategoryValidationCreate } from "@/_Backend/modules/interviewsCategory/interviewsCategory.validation";

const config = {
  model: interviewCategoryModel,
  name: "interview-Category",
  options: {
    searchfields: ["title", "slug"],
  },
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
});
export const POST = insertOne({
  schemaValidation: interviewsCategoryValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
  slug: "title",
});

import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { interviewCategoryModel } from "@/_Backend/database/models/interviewsCategory.model";
import { interviewsCategoryValidationUpdate } from "@/_Backend/modules/interviewsCategory/interviewsCategory.validation";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";

const config = {
  model: interviewCategoryModel,
  name: "interview-Category",
  schemaValidation: interviewsCategoryValidationUpdate,
  allowedTo: [...enumRoles.adminRoles],
  slug: "title",
    cache: {
    group: true,
    stdTTL: "1y",
  },
};
export const GET = FindOne({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
});
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);

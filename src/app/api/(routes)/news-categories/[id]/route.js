import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { newsCategoryModel } from "@/_Backend/database/models/newsCategory.model";
import { newsCategoryValidationUpdate } from "@/_Backend/modules/newsCategory/newsCategory.validation";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";

const config = {
  model: newsCategoryModel,
  name: "news-Category",
  schemaValidation: newsCategoryValidationUpdate,
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

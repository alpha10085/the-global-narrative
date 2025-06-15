import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { newsCategoryModel } from "@/_Backend/database/models/newsCategory.model";
import { newsCategoryValidationCreate } from "@/_Backend/modules/newsCategory/newsCategory.validation";

const config = {
  model: newsCategoryModel,
  name: "news-Category",
  options: {
    searchfields: ["title", "slug"],
  },
    cache: {
    group: true,
    stdTTL: "1y",
  },
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
});
export const POST = insertOne({
  schemaValidation: newsCategoryValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
  slug: "title",
});

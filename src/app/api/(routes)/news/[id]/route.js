import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";
import { newsModel } from "@/_Backend/database/models/news.model";
import { newsValidationUpdate } from "@/_Backend/modules/news/news.validation";

const config = {
  model: newsModel,
  name: "news",
  alloweTo: [enumRoles.adminRoles],
  schemaValidation: newsValidationUpdate,
};
export const GET = FindOne(config);
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);

import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { imageLookup } from "@/_Backend/commons/lookup";
import { newsModel } from "@/_Backend/database/models/news.model";
import { newsValidationCreate } from "@/_Backend/modules/news/news.validation";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { customQuery } from "./services";

const config = {
  model: newsModel,
  name: "news",
  options: {
    searchFeilds: ["title", "content", "date"],
  },
   customQuery
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
  pushToPipeLine: imageLookup("poster"),
});
export const POST = insertOne({
  schemaValidation: newsValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
  slug: "title",
});

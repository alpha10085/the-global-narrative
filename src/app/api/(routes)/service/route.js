import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { imageLookup } from "@/_Backend/commons/lookup";
import { serviceModel } from "@/_Backend/database/models/service.model";
import { serviceValidationCreate } from "@/_Backend/modules/service/service.validation";

const config = {
  model: serviceModel,
  name: "service",
  options: {
    searchfields: ["title", "description"],
  },
    cache: {
    group: true,
    stdTTL: "1y",
  },
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
  pushToPipeLine: imageLookup("poster"),
});
export const POST = insertOne({
  schemaValidation: serviceValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
});

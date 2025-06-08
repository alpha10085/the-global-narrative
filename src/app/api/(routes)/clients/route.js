import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { clientModel } from "@/_Backend/database/models/clients.model";
import { imageLookup } from "@/_Backend/commons/lookup";
import { clientsValidationCreate } from "@/_Backend/modules/clients/clients.validation";

const config = {
  model: clientModel,
  name: "client",
  options: {
    searchfields: ["title"],
  },
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
  pushToPipeLine: imageLookup("logo"),
});
export const POST = insertOne({
  schemaValidation: clientsValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
});

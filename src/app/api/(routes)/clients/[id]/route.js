import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { clientModel } from "@/_Backend/database/models/clients.model";
import { clientsValidationUpdate } from "@/_Backend/modules/clients/clients.validation";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";

const config = {
  model: clientModel,
  name: "client",
  schemaValidation: clientsValidationUpdate,
  allowedTo: [...enumRoles.adminRoles],
};
export const GET = FindOne({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
});
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);

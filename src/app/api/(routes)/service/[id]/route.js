import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { serviceModel } from "@/_Backend/database/models/service.model";
import { serviceValidationUpdate } from "@/_Backend/modules/service/service.validation";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";

const config = {
  model: serviceModel,
  name: "service",
  schemaValidation: serviceValidationUpdate,
  allowedTo: [...enumRoles.adminRoles],
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

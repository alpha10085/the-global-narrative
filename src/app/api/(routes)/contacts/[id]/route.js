import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { deleteOne, FindOne } from "@/_Backend/utils/handlers";
import { contactUsModel } from "@/_Backend/database/models/contact-us";

const config = {
  model: contactUsModel,
  name: "contact Form",
  alloweTo: [enumRoles.adminRoles],
};
export const GET = FindOne(config);
export const DELETE = deleteOne(config);

import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { contactUsModel } from "@/_Backend/database/models/contact-us";
import { contactUsValidation } from "@/_Backend/modules/contact-us/contact-us.validation";

const config = {
  model: contactUsModel,
  name: "contact Form",
  options: {
    searchFeilds: ["email", "phone", "name"],
  },
};
export const GET = FindAll({
  ...config,
  alloweTo:[enumRoles.adminRoles]
});
export const POST = insertOne({
  schemaValidation: contactUsValidation,
  alloweTo: [],
  ...config,
});

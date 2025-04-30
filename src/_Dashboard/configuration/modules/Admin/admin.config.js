import adminSchema from "./admin.schema.json";
import { adminVal } from "./admin.validation";

export const adminConfig = {
  key: "admins",
  displayName: "admins",
  type: "private",
  schema: adminSchema,
  validation: adminVal,
};


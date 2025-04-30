import userSchema from "./user.schema.json";
import { userVal } from "./user.validation";

export const userConfig = {
  key: "users",
  displayName: "users",
  type: "private",
  schema: userSchema,
  validation: userVal,
};

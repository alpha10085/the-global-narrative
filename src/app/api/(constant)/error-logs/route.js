import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { errorLogModel } from "@/_Backend/database/models/constant/errorLog.model";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { errorLogValidationCreate } from "@/_Backend/modules/_constant/errorLogs/error-logs.validation";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

const config = {
  model: errorLogModel,
  name: "error report ",
  slug: "message",
  options: {
    searchfields: ["message"],
  },
  schemaValidation: errorLogValidationCreate,
  publishMode: false,
};
export const GET = FindAll(config);
export const POST = insertOne({
  ...config,
});

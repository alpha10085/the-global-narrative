import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { errorLogModel } from "@/_Backend/database/models/constant/errorLog.model";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { errorLogValidationCreate } from "@/_Backend/modules/_constant/errorLogs/error-logs.validation";
import { reportError, sendEmailToTeam } from "./services";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { validation } from "@/_Backend/middlewares/globels/validation";

const config = {
  model: errorLogModel,
  name: "error report",
  options: {
    searchfields: ["message"],
  },
  schemaValidation: errorLogValidationCreate,
  publishMode: false,
};
export const GET = FindAll({
  ...config,
  allowedTo: enumRoles.adminRoles,
});
export const POST = AsyncHandler(
  async (req, res, next) => {
    validation(errorLogValidationCreate)(req.body, req.params, req.query);
    const userAgent = req.userAgent;
    req.body.route = {
      server: null,
      client: req.body.route,
    };
    
    await reportError({
      deteils: req.body,
      userAgent: userAgent,
    });
    return res({
      message: "success",
    });
  },
  {
    decodeUserAgent: true,
  }
);

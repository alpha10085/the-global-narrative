import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { errorLogModel } from "@/_Backend/database/models/constant/errorLog.model";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { errorLogValidationCreate } from "@/_Backend/modules/_constant/errorLogs/error-logs.validation";
import { sendEmailToTeam } from "./hooks";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

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
// export const POST = insertOne({
//   ...config,
//   hooks: {
//     after: sendEmailToTeam,
//   },
// });

export const POST = AsyncHandler(
  async (req, res, next) => {
    const userAgent = req.userAgent;

    const isExitstBefore = await errorLogModel.findOne({
      message: req?.body?.message,
      
    });
    return res({
      message: "success",
    });
  },
  {
    decodeUserAgent: true,
  }
);

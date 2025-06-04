import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { errorLogModel } from "@/_Backend/database/models/constant/errorLog.model";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { errorLogValidationCreate } from "@/_Backend/modules/_constant/errorLogs/error-logs.validation";
import { sendEmailToTeam } from "./hooks";
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
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const isExitstBefore = await errorLogModel.findOne({
      message: req?.body?.message,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });
    if (!isExitstBefore) {
      const newDocerrorLog = new errorLogModel({
        ...req.body,
        ip: userAgent.ip,
        location: {
          country: userAgent?.country,
          timezone: userAgent?.timezone,
        },
        os: userAgent?.os?.name,
        browser: userAgent.browser.name,
      });

      await newDocerrorLog.save();
      await sendEmailToTeam(req, newDocerrorLog);
    }
    return res({
      message: "success",
    });
  },
  {
    decodeUserAgent: true,
  }
);

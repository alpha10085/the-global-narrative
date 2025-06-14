import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { contactUsModel } from "@/_Backend/database/models/contact-us";
import { contactUsValidation } from "@/_Backend/modules/contact-us/contact-us.validation";
import { honeypotMiddleware } from "@/_Backend/middlewares/security/honeypot";
import { recaptchaMiddleware } from "@/_Backend/middlewares/security/recaptchaMiddleware";
import { rateLimitMiddleware } from "@/_Backend/middlewares/security/rateLimitMiddleware";

const config = {
  model: contactUsModel,
  name: "contact Form",
  options: {
    searchFeilds: ["email", "phone", "name"],
  },
};
export const GET = FindAll({
  ...config,
  alloweTo: [enumRoles.adminRoles],
});
export const POST = insertOne({
  schemaValidation: contactUsValidation,
  alloweTo: [],
  middlewares: [
    rateLimitMiddleware({
      limit: 3,
      windowMs: 60 * 60 * 1000, // 3 requests per 10 minutes
    }),
    // honeypotMiddleware,
    recaptchaMiddleware,
  ],
  ...config,
});

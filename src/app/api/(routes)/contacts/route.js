import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { contactUsModel } from "@/_Backend/database/models/contact-us";
import { contactUsValidation } from "@/_Backend/modules/contact-us/contact-us.validation";
import { recaptchaMiddleware } from "@/_Backend/middlewares/security/recaptchaMiddleware";
import { rateLimitMiddleware } from "@/_Backend/middlewares/security/rateLimitMiddleware";
import { timeToMillis } from "@/utils/time";
import { sendEmail } from "@/_Backend/utils/email";
import { ContactNotifyEmailTemplate } from "./email";

const configEndpoint = {
  model: contactUsModel,
  name: "contact Form",
  options: {
    searchFeilds: ["email", "phone", "name"],
  },
};
export const GET = FindAll({
  ...configEndpoint,
  alloweTo: [enumRoles.adminRoles],
});
export const POST = insertOne({
  schemaValidation: contactUsValidation,
  alloweTo: [],
  middlewares: [
    rateLimitMiddleware({
      limit: 3, //limit 3 requests
      windowMs: timeToMillis("1h"), // 3 requests per 10 minutes
    }),
    // honeypotMiddleware,
       recaptchaMiddleware,
  ],
  hooks: {
    after: async (req, data) => {
      try {
        await sendEmail({
          subject: "The Global Narrtive | 📩 New Contact Message",
          html: ContactNotifyEmailTemplate(data),
        });
      } catch (error) {}
    },
  },
  ...configEndpoint,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

import { faqModel } from "@/_Backend/database/models/faq.model";
import { servicesPageModel } from "@/_Backend/database/models/pages/services.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { AppError } from "@/_Backend/utils/AppError";

export const GET = AsyncHandler(async (req, res) => {
  const document = await servicesPageModel.findOne().lean();
  if (!document) {
    throw new AppError({
      message: `Page is not found`,
      code: 404,
    });
  }

  const faqs = await faqModel.find().lean();

  return res(
    {
      ...document,
      faqs,
    },
    200
  );
});

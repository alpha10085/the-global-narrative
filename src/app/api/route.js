import { clientModel } from "@/_Backend/database/models/clients.model";
import analyticsModel from "@/_Backend/database/models/constant/analytics.model";
import fileModel from "@/_Backend/database/models/constant/file.model";
import { SingleTypeModel } from "@/_Backend/database/models/constant/singleType";
import UserModel from "@/_Backend/database/models/constant/user.model";
import { faqModel } from "@/_Backend/database/models/faq.model";
import { interviewModel } from "@/_Backend/database/models/interviews.model";
import { interviewCategoryModel } from "@/_Backend/database/models/interviewsCategory.model";
import { newsModel } from "@/_Backend/database/models/news.model";
import { newsCategoryModel } from "@/_Backend/database/models/newsCategory.model";
import { interviewsModel } from "@/_Backend/database/models/pages/interviews.model";
import { serviceModel } from "@/_Backend/database/models/service.model";
import { testimonialModel } from "@/_Backend/database/models/testimonial.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { migrateModelsToProd } from "@/_Backend/migrateTools/database";

const models = [
  SingleTypeModel,
  analyticsModel,
  UserModel,
  clientModel,
  faqModel,
  interviewModel,
  interviewsModel,
  interviewCategoryModel,
  newsModel,
  newsCategoryModel,
  serviceModel,
  testimonialModel,
];
const sharedModels = [
  fileModel,
  clientModel,
  interviewCategoryModel,
  newsCategoryModel,
  testimonialModel,
];
export const GET = AsyncHandler(
  async (req, res, next) => {

    return res({
      message: "live",
    });
  },
  {
    cache: {
      stdTTL: "10m",
    },
  }
);

import { interviewCategoryModel } from "@/_Backend/database/models/interviewsCategory.model";
import { newsCategoryModel } from "@/_Backend/database/models/newsCategory.model";
import { interviewsModel } from "@/_Backend/database/models/pages/interviews.model";
import { newsPageModel } from "@/_Backend/database/models/pages/newsPage.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { AppError } from "@/_Backend/utils/AppError";

export const GET = AsyncHandler(
  async (req, res) => {
    const document = await interviewsModel.findOne().lean();
    if (!document) {
      throw new AppError({
        message: `Page is not found`,
        code: 404,
      });
    }

    const categories = await interviewCategoryModel
      .find({ publish: true })
      .lean();

    return res(
      {
        ...document,
        categories,
      },
      200
    );
  },
  {
    cache: {
      stdTTL: "0s",
    },
  }
);

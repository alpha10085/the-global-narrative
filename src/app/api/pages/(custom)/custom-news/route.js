import { newsCategoryModel } from "@/_Backend/database/models/newsCategory.model";
import { newsPageModel } from "@/_Backend/database/models/pages/newsPage.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { AppError } from "@/_Backend/utils/AppError";

export const GET = AsyncHandler(
  async (req, res) => {
    const document = await newsPageModel.findOne().lean();
    if (!document) {
      throw new AppError({
        message: `Page is not found`,
        code: 404,
      });
    }

    const categories = await newsCategoryModel.find({ publish: true }).lean();

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

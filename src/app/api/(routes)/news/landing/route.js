import mongoose from "mongoose";
import { newsModel } from "@/_Backend/database/models/news.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { handleArrayOdIds, sortByIdsOrder } from "@/_Backend/utils/sort";

export const GET = AsyncHandler(async (req, res) => {
  const { ids = [] } = req?.query;
  const arrayOfIds = handleArrayOdIds(ids)

  const objectIds = arrayOfIds.map((id) => new mongoose.Types.ObjectId(id));

  const data = await newsModel.find({
    _id: { $in: objectIds },
    publish: true,
  }).lean();


  return res({
    news: sortByIdsOrder(data, arrayOfIds),
  });
});

import mongoose from "mongoose";
import { newsModel } from "@/_Backend/database/models/news.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

export const GET = AsyncHandler(async (req, res) => {
  const { ids = [] } = req?.query;
  const arrayOfIds = Array.isArray(ids)
    ? ids
    : typeof ids === "string"
      ? ids.split(",")
      : [];

  const objectIds = arrayOfIds.map((id) => new mongoose.Types.ObjectId(id));

  const data = await newsModel.find({
    _id: { $in: objectIds },
    publish: true,
  }).lean();

  // Sort based on original `ids` order
  const sortednews = arrayOfIds.map((id) =>
    data.find((news) => news._id.toString() === id)
  );

  return res({
    news: sortednews,
  });
});

import mongoose from "mongoose";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { serviceModel } from "@/_Backend/database/models/service.model";
import { sortByIdsOrder } from "@/_Backend/utils/sort";

export const GET = AsyncHandler(async (req, res) => {
  const { ids = [] } = req?.query;
  const arrayOfIds = Array.isArray(ids)
    ? ids
    : typeof ids === "string"
    ? ids.split(",")
    : [];

  const objectIds = arrayOfIds.map((id) => new mongoose.Types.ObjectId(id));

  const data = await serviceModel
    .find({
      _id: { $in: objectIds },
      publish: true,
    })
    .lean();

  return res({
    services: sortByIdsOrder(data, ids),
  });
});

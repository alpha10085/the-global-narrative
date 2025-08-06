import mongoose from "mongoose";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { handleArrayOdIds, sortByIdsOrder } from "@/_Backend/utils/sort";
import { clientModel } from "@/_Backend/database/models/clients.model";

export const GET = AsyncHandler(async (req, res) => {
  const { ids = [] } = req?.query;
  const arrayOfIds = handleArrayOdIds(ids);

  const objectIds = arrayOfIds.map((id) => new mongoose.Types.ObjectId(id));

  const data = await clientModel
    .find({
      _id: { $in: objectIds },
      publish: true,
    })
    .lean();

  return res({
    logos: sortByIdsOrder(data, arrayOfIds),
  });
});

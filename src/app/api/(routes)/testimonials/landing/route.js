import mongoose from "mongoose";
import { testimonialModel } from "@/_Backend/database/models/testimonial.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { sortByIdsOrder } from "@/_Backend/utils/sort";

export const GET = AsyncHandler(async (req, res) => {
  const { ids = [] } = req?.query;
  const arrayOfIds = Array.isArray(ids)
    ? ids
    : typeof ids === "string"
    ? ids.split(",")
    : [];

  const objectIds = arrayOfIds.map((id) => new mongoose.Types.ObjectId(id));

  const data = await testimonialModel
    .find({
      _id: { $in: objectIds },
      publish: true,
    })
    .lean();

  return res({
    testimonials: sortByIdsOrder(data, ids),
  });
});

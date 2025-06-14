import mongoose from "mongoose";
import { testimonialModel } from "@/_Backend/database/models/testimonial.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

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

  // Sort the testimonials based on the order of `ids`
  const sortedtestimonials = arrayOfIds?.map((id) =>
    data?.find((testimonial) => testimonial?._id?.toString() === id)
  );
  return res({
    testimonials: sortedtestimonials,
  });
});

import { landingModel } from "@/_Backend/database/models/pages/landing.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

export const GET = AsyncHandler(async (req, res) => {
  const data = await landingModel
    .findOne().populate("testimonialSection.posts")
    .lean();
    
  return res({
    testimonial: data?.testimonialSection,
  });
});

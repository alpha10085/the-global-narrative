import { landingModel } from "@/_Backend/database/models/pages/landing.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

export const GET = AsyncHandler(
  async (req, res, next) => {
    let data = {
      time: new Date().toLocaleString(),

    };

    return res({
      message: "live",
      data,
    });
  },
  {
    cache: {
      stdTTL: "10m",
    },
  }
);

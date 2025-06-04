import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { headers } from "next/headers";

export const GET = AsyncHandler(
  async (req, res, next) => {

    return res({
      message: "live",
    });
  },
  {
    decodeUserAgent: true,
  }
);

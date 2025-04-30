import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

export const GET = AsyncHandler(async (req, res, next) => {
  return res({
    message: "live",
  });
});

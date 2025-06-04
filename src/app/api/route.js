import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

export const GET = AsyncHandler(async (req, res, next) => {
  console.log("🚀 ~ GET ~ req:", req.useragent)
  return res({
    message: "live",
  });
},{
  decodeUserAgent:true
});

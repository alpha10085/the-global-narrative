import RateLimitModel from "@/_Backend/database/models/constant/rateLimit.model";
import { AppError } from "@/_Backend/utils/AppError";
import crypto from "crypto";

export const rateLimitMiddleware = ({
  limit = 5,
  windowMs = 15 * 60 * 1000, // 15 minutes
} = {}) => {
  return async (req, res, next) => {
    const ip = req.userAgent?.ip || req.headers["x-forwarded-for"] || "unknown";
    const ua = req.userAgent?.ua || req.headers["user-agent"] || "unknown";

    const rawIdentifier = `${ip}-${ua}`;
    const identifier = crypto
      .createHash("sha256")
      .update(rawIdentifier)
      .digest("hex"); // safer, fixed length

    const now = Date.now();
    const windowStart = new Date(now - windowMs);

    let record = await RateLimitModel.findOne({ identifier });

    if (record) {
      if (record?.windowStart > windowStart) {
        if (record?.count >= limit) {
          return next(
            new AppError({
              message: `Too many requests`,
              code: 429,
            })
          );
        }
        record.count += 1;
      } else {
        record.count = 1;
        record.windowStart = new Date();
      }
      await record.save();
    } else {
      await RateLimitModel.create({
        identifier,
        count: 1,
        windowStart: new Date(),
      });
    }

    next();
  };
};

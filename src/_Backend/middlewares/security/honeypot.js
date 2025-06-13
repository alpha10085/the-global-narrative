import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { AppError } from "@/_Backend/utils/AppError";

export const honeypotMiddleware = (req, res, next) => {
  const { confirm_email } = req.body;

  // If honeypot field is filled, it's likely a bot
  if (confirm_email && confirm_email.trim() !== "") {
    return next(
      new AppError({
        ...httpStatus.badRequest,
        message: "Bot detected. Submission rejected.",
      })
    );
  }

  next();
};

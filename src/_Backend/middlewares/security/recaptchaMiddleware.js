import { AppError } from "@/_Backend/utils/AppError";

export const recaptchaMiddleware = async (req, res, next, minScore = 0.5) => {
  const recaptchaToken = req.body?.recaptchaToken;

  if (!recaptchaToken) {
    throw new AppError({ message: "Missing reCAPTCHA token", statusCode: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${recaptchaToken}`,
    });

    const data = await response.json();

    if (!data.success) {
      throw new AppError({
        message: "Invalid reCAPTCHA token",
        statusCode: 403,
      });
    }

    if (data.score !== undefined && data.score < minScore) {
      throw new AppError({
        message: `reCAPTCHA score too low (${data.score}). Possibly a bot.`,
        statusCode: 403,
      });
    }

    next();
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    throw new AppError({
      message: "reCAPTCHA verification error",
      statusCode: 500,
    });
  }
};

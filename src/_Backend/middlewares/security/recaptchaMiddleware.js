// _Backend/middlewares/recaptchaMiddleware.js

import { AppError } from "@/_Backend/utils/AppError";


export const recaptchaMiddleware = async (req, res, next) => {
  const recaptchaToken = req.body.recaptchaToken;

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

    if (!data.success || data.score < 0.5) {
      throw new AppError({
        message: "reCAPTCHA validation failed",
        statusCode: 403,
      });
    }

    next(); 
  } catch (err) {
    throw new AppError({
      message: "reCAPTCHA verification error",
      statusCode: 500,
    });
  }
};

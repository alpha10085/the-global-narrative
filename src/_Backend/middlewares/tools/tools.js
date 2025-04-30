import httpStatus from "@/_Backend/assets/messages/httpStatus";

export const toolsMiddleware = async (req, res, next) => {
  try {
    if (
      !process.env.NEXT_PUBLIC_API ||
      !process.env.NEXT_PUBLIC_API.includes("127.0.0.1")
    ) {
      return next(httpStatus.NotFound);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

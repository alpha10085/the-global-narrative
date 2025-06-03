import { allModelsConfig } from "@/_Backend/modules/config";
import { AppError } from "@/_Backend/utils/AppError";
import { systemLogger } from "@/utils/consoleProxy";
import i18next from "i18next";

/**
 * Utility function to handle validation errors
 */
const handleValidationError = (error) => {
  systemLogger(error.details);

  const details = error.details.reduce((prev, curr, i) => {
    const key = curr?.path?.join(".");
    prev[key] = curr?.message?.replace(`"${key}" `, "");
    return prev;
  }, {});
  throw new AppError({
    message: `validation-error`,
    // translated: true,
    code: 400,
    details,
  });
};

/**
 * Validates the request body against a schema based on the request method and key
 */
export const pageValidation = (Request = {}, body, params) => {
  const key = params?.key;
  const mode = Request?.method?.toUpperCase() === "POST" ? "create" : "update";
  const schema = allModelsConfig?.[key]?.validation?.[mode];
  if (!schema)
    throw new AppError({
      message: "pages.notFound",
    });
  const { error } = schema.validate({ ...body }, { abortEarly: false });

  if (error) handleValidationError(error);
};

/**
 * Generic validation middleware for schemas
 */
export const validation =
  (schema) =>
  (body = {}, params = {}) => {
    const { error, value } = schema.validate(
      { ...body, ...params },
      { abortEarly: false } // Ensure all errors are captured
    );
    if (error) {
      handleValidationError(error);
    }
  };

import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { allModelsConfig } from "@/_Backend/modules/config";
import { isObjectId } from "@/_Backend/utils/handletypes";

const handleFindModel = (key) => {
  const model = allModelsConfig?.[key];
  if (!model || !model?.model?.translationConfig) {
    return {};
  }

  return model;
};
function getMainModelPath({ url = "" } = {}) {
  try {
    const keys = url.split("/");
    if (keys?.[2] === "pages") {
      return keys?.[3] || "";
    }
    return keys[2] || "";
  } catch (error) {
    return "";
  }
}

export const translatetorMiddleware =
  (mainkey = null) =>
  async (req, res, next) => {
    // Get model path from url or main key
    const key = mainkey || getMainModelPath(req);
    // Find model configuration and check if translation exists
    const translations = req?.body?.translations || [];
    // If translation exists, add bulk operations to request
    const deletedTranslations = req?.body?.deletedTranslations || [];

    const { model = null } = handleFindModel(key);
    if (!model) {
      if (req?.body?.deletedTranslations || req?.body?.translations) {
        return next({
          message: httpStatus.NotFound.message,
          code: 404,
        });
      }

      return next();
    }

    const operations = [];
    if (translations?.length) {
      const bulkOperations = await model.bulkCheckAvailability(translations);
      operations.push(...bulkOperations);
    }
    if (deletedTranslations?.length) {
      deletedTranslations?.forEach((ele) => {
        if (!isObjectId(ele)) return;
        operations.push({
          deleteOne: {
            filter: {
              _id: ele,
            },
          },
        });
      });
    }
    if (operations?.length) {
      req.translations = { bulkOperations: operations };
    }
    delete req.body.translations;
    delete req.body.deletedTranslations;

    return next();
  };

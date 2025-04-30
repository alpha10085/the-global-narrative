import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

import { allModelsConfig } from "../modules/config";

const middleware = async (req, res, next) => {
  let [_, model, _id] = req.url.replace(/^\/|\/$/g, "").split("/");
  if (model === "pages") {
    let page = req?.query?.pageKey;
    if (!page)
      return next({
        message: "Page not found",
        status: 404,
      });
    model = page;
  }
  req.transaltion = {
    modelKey: model,
    id: _id,
    key: req.query.key,
  };

  return next();
};
const GETModel = (req, next) => {
  const Model = allModelsConfig?.[req.transaltion.modelKey];
  if (!Model) {
    return next({
      message: "Model not found",
      status: 404,
    });
  }

  return Model;
};
//create
const POST = AsyncHandler(
  async (req, res, next) => {
    const { model } = GETModel(req, next);
    const { id } = req?.transaltion;
    const data = await model.insertOneTranslation(id, req?.body);
    return res(data, 200);
  },
  {
    middlewares: [middleware],
  }
);
// read
const GET = AsyncHandler(
  async (req, res, next) => {
    const { model } = GETModel(req, next);
    const data = await model.findTranslations(req.transaltion.id, {
      key: req?.transaltion?.key,
    });
    return res(data, 200);
  },
  {
    middlewares: [middleware],
  }
);
// update
const PUT = AsyncHandler(
  async (req, res, next) => {
    const { model } = GETModel(req, next);
    const { id } = req?.transaltion;
    const data = await model.updateOneTranslation(id, req?.body);
    return res(data, 200);
  },
  {
    middlewares: [middleware],
  }
);
// delete
const DELETE = AsyncHandler(
  async (req, res, next) => {
    const { model } = GETModel(req, next);
    const { id } = req?.transaltion;
    const data = await model.deleteOneTranslation(id);
    return res(data, 200);
  },
  {
    middlewares: [middleware],
  }
);
export const allTranslationMethods = {
  POST: POST,
  GET: GET,
  PUT: PUT,
  DELETE: DELETE,
};

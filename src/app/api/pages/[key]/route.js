import { pageValidation } from "@/_Backend/middlewares/globels/validation";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { SingleTypeModel } from "@/_Backend/database/models/singleType";
import { AppError } from "@/_Backend/utils/AppError";

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { allModelsConfig } from "@/_Backend/modules/config";
import { translatetorMiddleware } from "@/_Backend/middlewares/globels/translatetor";
import mongoose from "mongoose";
import i18next from "i18next";

export const adminPopulate = [
  { path: "createdBy", select: "fullName" },
  { path: "updatedBy", select: "fullName" },
];
export const POST = AsyncHandler(
  async (req, res) => {
    // Validate the request data using the pageValidation function
    pageValidation(req, req?.body, req?.params);
    // Verify token and get user
    const user = req.user;
    const key = req?.params?.key;
    const check = await SingleTypeModel.findOne({ key });
    if (check) {
      throw new AppError({
        message: "pages.exists",
        code: 401,
      });
    }

    let Model = allModelsConfig?.[key]?.model;
    
    if (!Model) {
      throw new AppError({ message: "pages.notFound", code: 404 });
    }

    // Add the key to the body and create a new page
    req.body.key = key;
    req.body.createdBy = user?._id;
    if (req?.translations?.bulkOperations) {
      await Model.bulkUpsertTranslations({
        bulkOperations: req?.translations?.bulkOperations,
      });
    }
    const newPage = await Model.findOneAndUpdate(
      { _id: req.body._id || new mongoose.Types.ObjectId() }, // Use req.body._id if provided, otherwise generate a new one
      { $set: req.body }, // Update other fields
      { new: true, upsert: true } // new returns the updated document, upsert creates it if it doesn't exist
    )
      .setOptions({
        admin: req.isAdmin,
        language: req?.language,
        removeTranslations: false,
      })
      .lean();
    newPage.createdBy = {
      fullName: user?.fullName,
      _id: user?._id,
    };

    // Return a successful response
    return res(
      {
        message: i18next.t("pages.saved"),
        data: newPage,
      },
      200
    );
  },
  {
    relationCacheTags: [],
    allowedTo: [...enumRoles.adminRoles],
    middlewares: [translatetorMiddleware()],
  }
);
export const PUT = AsyncHandler(
  async (req, res) => {
    pageValidation(req, req?.body, req?.params);
    // Verify token and get user
    const user = req.user;
    // Find the single Model first to determine its type
    let key = req?.params?.key;
    let Model = allModelsConfig[key]?.model;

    if (!Model) {
      throw new AppError({
        message: "pages.notFound",
        code: 404,
      });
    }
    req.body.updatedBy = user?._id;

    if (req?.translations?.bulkOperations) {
      await Model.bulkUpsertTranslations({
        bulkOperations: req?.translations?.bulkOperations,
      });
    }
    let data = await Model.findOneAndUpdate({ key }, req?.body, {
      new: true,
    })
      .setOptions({
        language: req?.language,
        removeTranslations: !req.isAdmin,
                admin: req.isAdmin,
      })
      .lean()
      .populate(adminPopulate);

    if (!data) {
      throw new AppError({
        message: "pages.notFound",
        code: 404,
      });
    }
    return res({ message: i18next.t("updated"), data }, 200);
  },
  {
    cache: {
      relationCacheTags: [],
    },
    allowedTo: [...enumRoles.adminRoles],
    middlewares: [translatetorMiddleware()],
  }
);
export const GET = AsyncHandler(
  async (req, res) => {
    const user = req.user;
    const populateOptions = req.isAdmin ? adminPopulate : [];
    let key = req?.params?.key;
    let Model = allModelsConfig[key]?.model;
    if (!Model) {
      throw new AppError({
        message: "pages.notFound",
        code: 404,
      });
    }
    const document = await Model.findOne({ key })
      .setOptions({
        language: req?.language,
        removeTranslations: !req.isAdmin,
     
        admin: req.isAdmin,
      })
      .populate(populateOptions)
      .lean();

    if (!document) {
      throw new AppError({
        message: "pages.notFound",
        code: 404,
        details: {
          defaultSchema: req.isAdmin ? new Model() : undefined,
        },
      });
    }
    return res(document, 200);
  },
  {
    cache: {
      stdTTL: "1y",
    },
    allowedTo: [...enumRoles.adminRoles, "public"],
  }
);

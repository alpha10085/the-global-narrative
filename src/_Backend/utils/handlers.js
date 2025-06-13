import slugify from "slugify";
import { AsyncHandler } from "../middlewares/globels/AsyncHandler";
import { validation } from "../middlewares/globels/validation";
import { handleFilterwithLookUp, handleQuerySlugOrid } from "./QueryHnadler";
import { ApiFetcher } from "@/_Backend/utils/ApiFetcher";
import { AppError } from "./AppError";

import mongoose from "mongoose";
import httpStatus from "../assets/messages/httpStatus";
import { adminPopulateHandler } from "../commons/lookup";

export const getNestedProperty = (obj, key) => {
  return (
    key?.split(".")?.reduce((acc, part) => acc && acc?.[part], obj) || null
  );
};

const createQueryForUniqueFields = (
  uniqueFields,
  slugValue,
  body,
  excludeId
) => {
  const query = { $or: [] };
  if (uniqueFields?.length) {
    uniqueFields.forEach((field) => {
      if (body?.[field]) query.$or.push({ [field]: body[field] });
    });
  }
  if (slugValue)
    query.$or.push({
      slug: slugify(slugValue, {
        lower: true,
        remove: /[^\w\s-]/g,
        replacement: "-",
        strict: true,
        trim: true,
        preserveCase: false,
        locale: "en-US",
      }),
    });
  if (excludeId) query._id = { $ne: excludeId };
  return query.$or.length ? query : null;
};
const defaultFunction = async (req = {}, data = {}) => {};

const defaultCache = { group: false, stdTTL: "0s", relationCacheTags: [] };

export const insertOne = ({
  model,
  name = "",
  slug = null,
  uniqueFields = [],
  allowedTo = [],
  auth = false,
  schemaValidation,
  cache = defaultCache,
  middlewares = [],
  hooks = {}, // <- Define default empty object first
}) => {
  // Destructure with fallback
  const { before = defaultFunction, after = defaultFunction } = hooks;

  return AsyncHandler(
    async (req, res) => {
      validation(schemaValidation)(req.body, req.params, req.query);
      const user = req.user;

      const slugValue = getNestedProperty(req.body, slug);
      if (slug && slugValue) {
        uniqueFields.push(slug);
        req.body.slug = slugify(slugValue, {
          lower: true,
          remove: /[^\w\s-]/g,
          replacement: "-",
          strict: true,
          trim: true,
          preserveCase: false,
          locale: "en-US",
        });
      }

      const queryForCheck = createQueryForUniqueFields(
        uniqueFields,
        slugValue,
        req.body
      );

      if (queryForCheck && (await model.findOne(queryForCheck))) {
        throw new AppError({
          ...httpStatus.conflict,
          key: name,
        });
      }

      req.body.createdBy = user?._id;

      if (req?.translations?.bulkOperations) {
        await model.bulkUpsertTranslations({
          bulkOperations: req?.translations?.bulkOperations,
        });
      }

      await before(req, req?.body);

      const data = await model
        .findOneAndUpdate(
          { _id: req?.body?._id || new mongoose.Types.ObjectId() },
          { $set: req?.body },
          { new: true, upsert: true }
        )
        .lean()
        .setOptions({
          admin: req?.isAdmin,
          language: req?.language,
          removeTranslations: !req?.isAdmin,
        });

      const response = {
        ...data,
        createdBy: { fullName: user?.fullName, _id: user?._id },
      };

      await after(req, response);

      return res(
        { message: `${name} saved successfully`, data: response },
        201
      );
    },
    {
      cache,
      allowedTo,
      middlewares,
      auth,
    }
  );
};

export const FindOne = ({
  model,
  name = "",
  allowedTo = [],
  auth = false,
  publishMode = true,
  cache = defaultCache,
  middlewares = [],
  populate = [],
  populatewithTranslation = [],
}) => {
  return AsyncHandler(
    async (req, res) => {
      const isSupportTranslation = model.translationConfig;
      const user = req.user;
      let data = null;

      if (isSupportTranslation && !req.isAdmin) {
        data = await model.findOneWithTranslation(req.params.id, {
          language: req?.language,
          populate: [...populate, ...populatewithTranslation],
        });
      } else {
        const query = handleQuerySlugOrid(req.params.id);
        if (publishMode && !req.isAdmin) query.publish = true;
        data = await model
          .findOne(query)
          .setOptions({
            admin: req?.isAdmin,
            language: req?.language,
            removeTranslations: !req?.isAdmin,
            populatewithTranslation,
          })
          .lean()
          .populate([...populate, ...adminPopulateHandler(user)]);
      }

      if (!data)
        throw new AppError({
          ...httpStatus.NotFound,
          key: name,
        });
      return res(data, 200);
    },
    {
      cache,
      middlewares,
      allowedTo,
      auth,
    }
  );
};

export const updateOne = ({
  model,
  name = "",
  slug = null,
  uniqueFields = [],
  allowedTo = [],
  auth = false,
  schemaValidation,
  cache = defaultCache,
  middlewares = [],
}) => {
  return AsyncHandler(
    async (req, res) => {
      validation(schemaValidation)(req.body, req.params, req.query);
      const user = req.user;
      const slugValue = getNestedProperty(req.body, slug);
      if (slug && slugValue) {
        uniqueFields.push(slug);
        req.body.slug = slugify(slugValue, {
          lower: true,
          remove: /[^\w\s-]/g,
          replacement: "-",
          strict: true,
          trim: true,
          preserveCase: false,
          locale: "en-US",
        });
      }
      const queryForCheck = createQueryForUniqueFields(
        uniqueFields,
        slugValue,
        req.body,
        req.params.id
      );
      if (queryForCheck && (await model.findOne(queryForCheck))) {
        throw new AppError({
          ...httpStatus.conflict,
          key: name,
        });
      }
      req.body.updatedBy = user?._id;
      if (req?.translations?.bulkOperations) {
        await model.bulkUpsertTranslations({
          bulkOperations: req?.translations?.bulkOperations,
        });
      }
      const data = await model
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .setOptions({
          admin: req?.isAdmin,
          language: req?.language,
          removeTranslations: !req?.isAdmin,
        })
        .lean()
        .populate(adminPopulateHandler(user));

      if (!data)
        throw new AppError({
          ...httpStatus.NotFound,
          key: name,
        });

      return res(
        {
          message: `${name} updated successfully`,
          data: {
            ...data,
            updatedBy: { fullName: user?.fullName, _id: user?._id },
          },
        },
        201
      );
    },
    {
      cache,
      allowedTo,
      auth,
      middlewares,
    }
  );
};

export const deleteOne = ({
  model,
  name = "",
  allowedTo = [],
  auth = false,
  cache = defaultCache,
  middlewares = [],
}) => {
  return AsyncHandler(
    async (req, res) => {
      const data = await model
        .findByIdAndDelete(req.params.id, {
          new: true,
        })
        .setOptions({
          admin: req?.isAdmin,
          language: req?.language,
          removeTranslations: !req?.isAdmin,
        })
        .lean();
      if (!data)
        throw new AppError({
          ...httpStatus.NotFound,
          key: name,
        });

      return res({ message: "Deleted Successfully" }, 200);
    },
    {
      cache,
      allowedTo,
      auth,
      middlewares,
    }
  );
};

export const FindAll = ({
  model,
  customQuery = null,
  pushToPipeLine = [],
  queryMiddleware = null,
  piplineMiddleware = null,
  publishMode = true,
  allowedTo = [],
  auth = false,
  options = {},
  cache = { group: true, stdTTL: "0s", relationCacheTags: [] },
  middlewares = [],
}) => {
  return AsyncHandler(
    async (req, res) => {
      const user = req.user;
      let pipeline = handleFilterwithLookUp(customQuery, req.query).concat(
        pushToPipeLine
      );
      if (queryMiddleware)
        req.query = { ...req.query, ...queryMiddleware(req.query, user) };
      if (piplineMiddleware) piplineMiddleware(pipeline, req.query, user);

      if (publishMode && !req.isAdmin) {
        pipeline.push({
          $match: {
            $or: [
              { publish: { $exists: false } }, // Include documents where 'publish' doesn't exist
              { publish: true }, // Include documents where 'publish' exists and is true
            ],
          },
        });
      }
      options = {
        ...options,
        admin: req?.isAdmin,
        language: req?.language,
        isTranslated: model.translationConfig,
      };
      const apiFetcher = new ApiFetcher(pipeline, req.query, options)
        .filter()
        .search()
        .select()
        .sort()
        .pagination();
      const queryFN = model.translationConfig
        ? () =>
            model.aggregateWithTranslation(apiFetcher.pipeline, {
              language: req?.language,
              mode: "soft",
            })
        : () => model.aggregate(apiFetcher.pipeline);

      const [data, total] = await Promise.all([
        queryFN(),
        apiFetcher.count(model),
      ]);
      return res(
        {
          data,
          metadata: {
            ...apiFetcher.metadata,
            pages: Math.ceil(total / apiFetcher.metadata.pageLimit),
            total,
          },
        },
        200
      );
    },
    {
      cache,
      allowedTo,
      auth,
      middlewares,
    }
  );
};

export const generateInitialize = ({
  model,
  auth = false,
  allowedTo = [],
  middlewares = [],
  name = "",
}) => {
  return AsyncHandler(
    async (req, res) => {
      const data = new model();
      return res(data, 201);
    },
    {
      middlewares,
      auth,
      allowedTo,
      name,
    }
  );
};

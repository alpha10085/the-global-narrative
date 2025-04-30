import mongoose from "mongoose";
import { AllLanguages, TranslationModel } from "../model/transaltion.model";

import {
  handleLanguage,
  isObject_Id,
  prepareTranslationsBeforeSave,
} from "./translations.handlers";
import { populateSelectedFields } from "./translations.populate";

const insertOneTranslation = async function (ref, translation = {}) {
  if (!translation) return null;
  const modelName = this.modelName;
  const values = await prepareTranslationsBeforeSave({
    translations: [
      {
        ...translation,
        modelName,
        ref,
      },
    ],
    modelName: this.modelName,
    translationschema: this?.translationschema,
  });
  const translationAfterinsert = new TranslationModel(values);
  await translationAfterinsert.save();
  return translationAfterinsert;
};
// find translations by ref id
const findTranslations = function (
  ref,
  filters = {},
  { limit = 20, skip = 0 } = {}
) {
  if (!mongoose.Types.ObjectId.isValid(ref)) return null;
  return TranslationModel.find({
    ref,
    modelName: this.modelName,
    ...filters,
  })
    .select("key value language slug")
    .limit(limit)
    .skip(skip);
};
// findOne ( slug | id )
const findOneWithTranslation = async function (
  slug,
  {
    language: lang = "en",
    populate: populateOptions = [],
    options = {},
    strictMode = true,
  }
) {
  const language = handleLanguage(lang, {
    // throwUnMactch: true,
  });

  populateOptions = populateOptions?.map((val) => {
    return {
      ...val,
      options: {
        ...val?.options,
        language,
        disableLanguageForRoot: true,
        strictPopulate: false,
      },
    };
  });

  // If the slug is a valid ObjectId, search by _id
  if (isObject_Id(slug)) {
    let translationoptions = {
      model: "Translation",
      select: populateSelectedFields,
      options: { translation: true, lean: true, strictPopulate: false },
    };
    populateOptions = [
      ...populateOptions,
      {
        path: "translation",
        ...translationoptions,
      },
    ];

    return await this.findById(slug)
      .setOptions({
        language,
        ...options,
        translation: true,
      })
      .populate(populateOptions)
      .lean();
  } else {
    // Otherwise, search by slug in the Translation model
    const findBySlug = await TranslationModel.findOne({
      slug,
      modelName: this.modelName,
      ...(strictMode
        ? {
            language,
          }
        : {}),
    })
      .populate({
        path: "ref",
        model: this.modelName,
        options: { language, ...options },
        populate: populateOptions,
      })
      .lean();

    // Return null if no reference is found or if ref is a valid ObjectId (indicating it wasn't populated)
    if (!findBySlug?.ref || mongoose.Types.ObjectId.isValid(findBySlug.ref))
      return null;

    return findBySlug?.ref;
  }
};
// update
const updateOneTranslation = async function (_id, field = null) {
  if (!mongoose.Types.ObjectId.isValid(_id)) return null;
  if (!field) return null;
  const modelName = this.modelName;
  const isExiste = await TranslationModel.findById(_id).lean();
  if (!isExiste) return null;

  const dataBeforeUpdate = {
    ...isExiste,
    ...field,
    modelName,
    _id,
  };

  await prepareTranslationsBeforeSave({
    translationschema: this?.translationschema,
    translations: [dataBeforeUpdate],
    modelName: this.modelName,
  });

  return await TranslationModel.findByIdAndUpdate(_id, dataBeforeUpdate, {
    new: true,
    select: populateSelectedFields,
  });
};
// delete
const deleteOneTranslation = async function (_id) {
  if (!mongoose.Types.ObjectId.isValid(_id)) return null;

  const translation = await TranslationModel.findByIdAndDelete(_id, {
    new: true,
  }).exec();
  if (!translation) return null;
  return translation;
};
const deleteTranslations = async function (list = []) {
  if (!Array.isArray(list) || list.length === 0) return null;
  // Assuming `list` contains an array of IDs
  const result = await TranslationModel.deleteMany({ _id: { $in: list } })
    .lean()
    .exec();
  // Check the deleted count
  if (result.deletedCount === 0) return null;
  return result;
};
// bluk Check Availability
const bulkCheckAvailability = async function (translations) {
  if (!Array.isArray(translations) || translations.length === 0) return false;
  return await prepareTranslationsBeforeSave({
    translations,
    translationschema: this?.translationschema,
    modelName: this.modelName,
  });
};
// bluk Upsert Translations
const bulkUpsertTranslations = async function ({
  translations = null,
  bulkOperations = null,
}) {
  if (
    (!Array.isArray(translations) || translations.length === 0) &&
    (!Array.isArray(bulkOperations) || bulkOperations.length === 0)
  )
    return false;

  if (!bulkOperations) {
    bulkOperations = await prepareTranslationsBeforeSave({
      translations,
      translationschema: this?.translationschema,
      modelName: this.modelName,
    });
  }

  return await TranslationModel.bulkWrite(bulkOperations);
};
export {
  insertOneTranslation,
  findTranslations,
  findOneWithTranslation,
  updateOneTranslation,
  deleteOneTranslation,
  bulkCheckAvailability,
  bulkUpsertTranslations,
  deleteTranslations,
};

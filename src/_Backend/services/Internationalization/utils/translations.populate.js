import { TranslationModel } from "../model/transaltion.model";
import { isObject_Id } from "./translations.handlers";

const populateSelectedFields = "key value path language slug";

const populateWithTranslation = function (optionspopulate = {}) {
  const language = this?.options?.language || "en";

  // Handle object or array input
  const preparePopulateOptions = (populate) => ({
    ...populate,
    options: {
      ...populate?.options,
      language,
      disableLanguageForRoot: true,
      strictPopulate: false,
    },
  });

  // If array, map over it; otherwise, process as a single object
  const populateOptions = Array.isArray(optionspopulate)
    ? optionspopulate.map(preparePopulateOptions)
    : preparePopulateOptions(optionspopulate);

  return this.populate(populateOptions).lean();
};

// Post-find hook
const postFind = function (docs, next) {
  const {
    translation = true,
    removeTranslations = true,
    disableLanguageForRoot = false,
  } = this.options;

  if (!translation) return next();

  const nestedKeys = Object.keys(
    this?.schema?.statics?.translationschema?.nested || {}
  );

  const processDocument = (
    doc,
    disableLanguage = disableLanguageForRoot,
    isRoot = false
  ) => {
    // Recursively handle nested keys
    if (isRoot && nestedKeys.length) {
      nestedKeys.forEach((key) => {
        if (doc[key]) {
          const nestedValue = doc[key];
          if (Array.isArray(nestedValue)) {
            nestedValue.forEach((item) => processDocument(item, true));
          } else {
            processDocument(nestedValue, true);
          }
        }
      });
    }

    // Process translations
    const translations = doc?.translation;
    if (!Array.isArray(translations)) return;

    translations.forEach(({ key, value, language, slug }) => {
      // Merge key-value pairs into the document
      if (!doc[key]) {
        doc[key] = value; // Assign the translated value to the document
      }

      // Add language and slug if not disabled
      if (!disableLanguage) doc.language = language;
      if (slug) doc.slug = slug;
    });

    // Remove the translation field after processing
    if (removeTranslations || !doc?.translation?.length) {
      delete doc.translation;
    }
  };

  try {
    if (Array.isArray(docs)) {
      docs.forEach((item) =>
        processDocument(item, disableLanguageForRoot, true)
      );
    } else if (docs) {
      processDocument(docs, disableLanguageForRoot, true);
    }
  } catch (error) {
    console.error("Error processing documents:", error);
  }

  next();
};

// Pre-find hook
const preFind = function (next) {
  const {
    translation = true,
    language = "en",
    disableTranslationForNested = false,
    populatewithTranslation = [],
  } = this.options;

  if (translation) {
    const translationPopulateConfig = {
      model: "Translation",
      match: { language },
      select: {
        __v: 0,
        modelName: 0,
      },
      options: {
        strictPopulate: false,
      },
    };

    const nestedKeys = Object.keys(
      this.schema?.statics?.translationschema?.nested || {}
    );

    const nestedPopulate = disableTranslationForNested
      ? []
      : nestedKeys.map((key) => ({
          path: `${key}.translation`,
          ...translationPopulateConfig,
        }));

    const pipelinePopulate = [
      { path: "translation", ...translationPopulateConfig },
      ...nestedPopulate,
    ];

    this.populate(pipelinePopulate);
  }

  this.populateWithTranslation(populatewithTranslation);

  next();
};

// Pre-find hook for delete
const postFindForDelete = async function (doc) {
  if (!doc) return;
  const nestedKeys = Object.keys(
    this.schema?.statics?.translationschema?.nested || {}
  );
  const listIds = [doc?._id];
  nestedKeys?.forEach((key) => {
    if (doc[key]) {
      const nestedValue = doc[key];
      if (Array.isArray(nestedValue)) {
        nestedValue.forEach((item) => {
          if (isObject_Id(item?._id)) {
            listIds.push(item?._id);
          } else if (isObject_Id(item)) {
            listIds.push(item._id);
          }
        });
      } else {
        if (isObject_Id(nestedValue?._id)) {
          listIds.push(nestedValue?._id);
        }
      }
    }
  });
  if (listIds.length !== 0) {
    await TranslationModel.deleteMany({
      ref: { $in: listIds.filter(Boolean) },
    });
  }
};

export {
  preFind,
  postFind,
  postFindForDelete,
  populateWithTranslation,
  populateSelectedFields,
};

//import slugify from "slugify";
import mongoose from "mongoose";
import { AllLanguages, TranslationModel } from "../model/transaltion.model";

export const handleLanguage = (val, { throwUnMactch = false } = {}) => {
  const throwErrror = () => {
    throw new Error(`Invalid Language ${val}`);
  };
  try {
    const rootLanguage = AllLanguages?.[val?.toString()];
    return throwUnMactch && !rootLanguage
      ? throwErrror()
      : rootLanguage || AllLanguages.default;
  } catch (error) {
    return throwUnMactch ? throwErrror() : AllLanguages.default;
  }
};

export const isObject_Id = (
  val,
  { throwUnMactch = false, name = "_id" } = {}
) => {
  const throwErrror = () => {
    throw new Error(`Invalid ${name} ${val}`);
  };
  try {
    return mongoose.Types.ObjectId.isValid(val?.toString())
      ? val
      : throwUnMactch
      ? throwErrror()
      : null;
  } catch (error) {
    return throwUnMactch ? throwErrror() : null;
  }
};

// export const lookpWithTranslate = ({ localField, foreignField, from }) => {
//   const translationLookupPipeline = [
//     {
//       $lookup: {
//         from: "translations",
//         localField: "_id",
//         foreignField: "ref",
//         as: "translations",
//       },
//     },
//     {
//       $addFields: {
//         translations: {
//           $filter: {
//             input: "$translations",
//             as: "translation",
//             cond: { $eq: ["$$translation.language", "$$rootLanguage"] },
//           },
//         },
//       },
//     },
//     {
//       $unwind: {
//         path: "$translations",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $addFields: {
//         translations: translationsMap,
//       },
//     },
//     {
//       $replaceRoot: {
//         newRoot: {
//           $mergeObjects: ["$$ROOT", "$translations"],
//         },
//       },
//     },
//     { $addFields: { [`translations`]: "$$REMOVE" } },
//   ];
//   return {
//     $lookup: {
//       from,
//       let: { localId: `$${localField}`, rootLanguage: "$language" },
//       pipeline: [
//         {
//           $match: {
//             $expr: { $eq: [`$${foreignField}`, "$$localId"] },
//           },
//         },
//         ...translationLookupPipeline,
//       ],
//       as: localField,
//     },
//   };
// };
export const lookpWithTranslate = ({ localField, foreignField, from }) => {
  return {
    $lookup: {
      from,
      let: { localId: `$${localField}`, rootLanguage: "$language" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: [`$${foreignField}`, "$$localId"] },
          },
        },
        {
          $lookup: {
            from: "translations",
            localField: "_id",
            foreignField: "ref",
            as: "translations",
          },
        },
        {
          $addFields: {
            translations: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$translations",
                    as: "translation",
                    cond: { $eq: ["$$translation.language", "$$rootLanguage"] },
                  },
                },
                0,
              ],
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$$ROOT", "$translations"],
            },
          },
        },
        { $unset: "translations" },
      ],
      as: localField,
    },
  };
};

function slugify(text) {
  return text
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, "") // Allow Arabic, English, numbers, and dashes
    .toLowerCase(); // Optional: Convert to lowercase
}

export const prepareTranslationsBeforeSave = async ({
  translations, // Array of translation objects
  translationschema,
  modelName,
}) => {
  // Validate input
  if (!Array.isArray(translations) || translations.length === 0) {
    throw {
      details: "Invalid-input",
      message: "Translations must be a non-empty array.",
    };
  }

  const uniqueTranslations = new Set(); // Track unique translations
  const validationQueries = []; // Queries for uniqueness validation
  const bulkWriteOperations = []; // Bulk write operations

  // Process translations
  for (const translation of translations) {
    const {
      ref: ref_id = undefined,
      key,
      value: instanceOfvalue = "",
      language: lang,
      path = "root",
      _id = undefined, // Optional _id for updates
    } = translation;

    const value = instanceOfvalue?.toString();
    
    const language = handleLanguage(lang, { throwUnMactch: true });
    const ref = isObject_Id(ref_id, { throwUnMactch: true, name: "ref" });

    const targetPath =
      path === "root"
        ? translationschema?.root
        : translationschema?.nested?.[path];

    if (!targetPath) {
      throw {
        details: "Invalid-path",
        message: "Invalid-path-specified",
      };
    }

    const fieldConfig = targetPath?.[key];

    if (typeof fieldConfig !== "boolean") {
      throw {
        details: `Invalid key: "${key}"`,
        message: "Invalid-key-for-translation",
      };
    }

    // Collect unique fields for validation
    const uniqueFields = fieldConfig ? { key, value } : null;

    if (uniqueFields) {
      const uniqueKey = `${key}-${value}-${path}-${modelName}`;
      if (uniqueTranslations.has(uniqueKey)) {
        throw {
          details: `Duplicate translation for key: "${key}", value: "${value}" in language: "${language}", ref: "${ref_id}".`,
          message: "Duplicate-translation",
        };
      }
      uniqueTranslations.add(uniqueKey);
    }

    // Generate slug if necessary
    const slug =
      (path === "root" ? key : `${path}.${key}`) === translationschema.slug
        ? slugify(value)
        : undefined;

    // Prepare query for uniqueness check
    const uniquenessCheckQuery = {
      modelName,
      path,
      $or: [
        { ref, language, key },
        ...(uniqueFields
          ? [
              {
                $and: [
                  { key: uniqueFields.key },
                  { value: uniqueFields.value },
                ],
              },
            ]
          : []),
      ],
    };

    // Add to validation queries and bulk operations
    const bulkWriteOperation = {
      updateOne: {
        filter: { modelName, ref, path, language, key },
        update: { $set: { value, slug } },
        upsert: !_id, // Perform upsert if no _id
      },
    };

    if (_id) {
      uniquenessCheckQuery._id = { $ne: _id }; // Exclude the current document in updates
      bulkWriteOperation.updateOne.filter._id = _id; // Include _id in the filter
    }

    validationQueries.push(uniquenessCheckQuery);
    bulkWriteOperations.push(bulkWriteOperation);
  }

  // Check for duplicates using a single query
  const conflictingTranslation = await TranslationModel.findOne({
    $or: validationQueries,
  });
  // Handle conflicts if any
  if (conflictingTranslation) {
    const conflictingDetails = translations.find((translation) => {
      return (
        translation.key === conflictingTranslation.key &&
        translation.value === conflictingTranslation.value &&
        translation.path === conflictingTranslation.path
      );
    });

    if (conflictingDetails) {
      throw {
        details: {
          translation: conflictingDetails,
        },
        message: "Duplicate-translation-in-Value",
      };
    }

    throw {
      message: "Duplicate-translation-in-language",
      details: "Duplicate translation found for this model, language, and ref.",
    };
  }

  return bulkWriteOperations; // Return prepared bulk write operations
};

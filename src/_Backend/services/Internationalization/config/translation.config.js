import { aggregateWithTranslation } from "../utils/translations.aggregate";
import { configValidation } from "../utils/translations.configuration";
import {
  insertOneTranslation,
  findTranslations,
  findOneWithTranslation,
  updateOneTranslation,
  deleteOneTranslation,
  bulkCheckAvailability,
  bulkUpsertTranslations,
  deleteTranslations,
} from "../utils/translations.methods";
import {
  populateWithTranslation,
  postFind,
  preFind,
  postFindForDelete,
} from "../utils/translations.populate";
/**
 * Configures the translation settings for a specific collection schema.
 *
 * @function TranslationConfig
 * @param {Object} config - The configuration object for translations.
 * @param {Object} config.model - The Mongoose schema model used for the collection.
 * @param {Object} config.schema - Defines the translation schema settings.
 * @param {string} config.schema.slug - The primary field used for generating slugs (e.g., "title").
 * @param {Object} config.schema.root - Specifies the root-level fields that can be translated.
 * @param {boolean} config.schema.root.title - Indicates whether the "title" field is translatable.
 * @param {boolean} config.schema.root.description - Indicates whether the "description" field is translatable.
 * @param {Object} config.schema.nested - Specifies nested fields that can be translated.
 * @param {boolean} config.schema.nested.name - Indicates whether the "name" field in nested data is translatable.
 * @param {boolean} config.schema.nested.description - Indicates whether the "description" field in nested data is translatable.
 * @param {string} config.name - The name of the collection (e.g., "collection").
 *
 * @example
 * TranslationConfig({
 *   model: myModel,
 *   schema: {
 *     slug: "title",
 *     root: {
 *       title: true,
 *       description: false,
 *     },
 *   nested: {
 *      arrayCase: { name: false, description: false },
 *    },
 *   },
 *   name: "product",
 * });
 */

const TranslationConfig = ({ model, schema = {}, name }) => {
  const { error } = configValidation(model, schema, name);
  // config virtuasl datatype ( findOne , findAll ) for model (loop through virtualConfig)
  let virtualConfig = [
    {
      name: "translation",
      config: {
        ref: "Translation", // Model to use for population,
        localField: "_id",
        foreignField: "ref",
      },
    },
  ];
  if (schema?.nested) {
    Object.keys(schema.nested).forEach((val) => {
      virtualConfig.push({
        name: `${val}.translation`,
        config: {
          ref: "Translation", // Model to use for population,
          localField: `${val}._id`,
          foreignField: "ref",
        },
      });
    });
  }
  virtualConfig.forEach((val) => model.virtual(val.name, val.config));
  model.set("toJSON", { virtuals: true });
  model.set("toObject", { virtuals: true });
  // add pre and post hooks
  let MatchMethods = /^find/;
  model.pre(MatchMethods, preFind);
  model.post(MatchMethods, postFind);
  model.post("findOneAndDelete", postFindForDelete);
  // add new static method for translationfields
  model.statics.translationschema = schema;
  model.statics.translationConfig = !error;
  // // add new method of find all with translations
  model.statics.aggregateWithTranslation = aggregateWithTranslation;
  // // add new method of find one ( slug | _id ) to find docment with locale
  model.statics.findOneWithTranslation = findOneWithTranslation;
  // // add new method of populate to make populate with Translation
  model.query.populateWithTranslation = populateWithTranslation;
  // crud translation
  model.statics.bulkCheckAvailability = bulkCheckAvailability;
  model.statics.bulkUpsertTranslations = bulkUpsertTranslations;
  model.statics.insertOneTranslation = insertOneTranslation;
  model.statics.findTranslations = findTranslations;
  model.statics.updateOneTranslation = updateOneTranslation;
  model.statics.deleteOneTranslation = deleteOneTranslation;
  //deleteTranslations
  model.statics.deleteTranslations = deleteTranslations;
  return model;
};

export default TranslationConfig;

import mongoose, { model, models, Schema } from "mongoose";
// Translation Schema

// new schema
const TranslationSchema = new Schema({
  slug: { type: String },
  modelName: { type: String }, // Model name
  language: { type: String }, // Language 
  key: { type: String }, // key
  value: {
    type: String,
  }, // value
  path: { type: String, default: "root" }, // Path to nested field in the target schema 
  ref: { type: mongoose.Schema.Types.ObjectId }, // Reference to the original entity
});
// Index to ensure unique combination of language, key, and ref
// TranslationSchema.index(
//   { language: 1, modelName: 1, ref: 1, path: 1 },
//   { unique: true }
// );

export const TranslationModel =
  models.Translation || model("Translation", TranslationSchema);

export const AllLanguages = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  ru: "ru",
  pl: "pl",
  pt: "pt",
  nl: "nl",
  sv: "sv",
  tr: "tr",
  vi: "vi",
  th: "th",
  ko: "ko",
  ja: "ja",
  zh: "zh",
  ar: "ar",
  cs: "cs",
  da: "da",
  el: "el",
  fi: "fi",
  id: "id",
  no: "no",
  hu: "hu",
  sk: "sk",
  sl: "sl",
  bg: "bg",
  hr: "hr",
  lt: "lt",
  lv: "lv",
  mt: "mt",
  ms: "ms",
  nb: "nb",
  pl: "pl",
  ro: "ro",
  ru: "ru",
  default: "en",
};

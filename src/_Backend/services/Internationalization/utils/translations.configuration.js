import mongoose from "mongoose";
import { TranslationConfigVal } from "./translations.validation";

const configValidation = (model = {}, schema = {}, name = "unkowen model") => {
  if (!(model instanceof mongoose.Schema)) {
    throw new Error(` Error - Invalid model for ${name}`);
  }
  const { error } = TranslationConfigVal.validate(
    { ...schema },
    { abortEarly: false }
  );
  if (false) {
    let details = "";
    error.details.forEach((val) => {
      details += `${val.message}\n`;
    });
    console.error(
      `⚠️   Warning - translation fialed for model ${name} details\n ${details}`
    );
    return { error: true };
  }
  return { error: null };
};
// for handle case configuration error
const configurationFailed = function () {
  const name = this.modelName;
  let error_in_nested_keys = false;
  const nestedKeys = Object.keys(this.translationschema?.nested);
  nestedKeys.forEach((key) => {
    if (!this?.schema?.obj?.[key]) {
      error_in_nested_keys = true;
    }
  });

  if (error_in_nested_keys) {
    console.error(
      `❌ Error - cant find nested targets [ ${nestedKeys.join(
        " "
      )} ] nested target must be exists in your schema ${name}`
    );
  }

  console.error(
    `⚠️  Translation disabled for model ${name} configuration failed`
  );

  return null;
};

export { configValidation, configurationFailed };

// for handle case validation error

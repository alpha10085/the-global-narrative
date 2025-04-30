import fs from "fs";
import path from "path";
import pluralize from "pluralize";

const generateValidation = ({
  name: schemaName,
  type: schemaType,
  schema,
  destinationPath_val: destinationPath,
}) => {
  try {
    let imports = `import Joi from "joi";
import { commonVal, fileVal } from "@/_Dashboard/commens/validation";
import { joiArray, joiText, messagesHandlers } from "@/_Dashboard/utils/JoiHandlers";\n`;

    const parseField = (field) => {
      const {
        name,
        type,
        required = false,
        max,
        min,
        single,
        ref,
        key,
      } = field;

      const minValue = `relation ? undefined : ${min}`;
      const isRequired = required ? `!relation` : false;

      const text = () =>
        `joiText({ locale, ${[
          max && `max: ${max}`,
          min && `min: ${minValue}`,
          required && `required: ${isRequired}`,
        ]
          .filter(Boolean)
          .join(",")} })`;

      const media = () => {
        const fileValSchema = `relation ? fileVal.optional() : fileVal.required()`;
        return single
          ? `${fileValSchema}.messages(messagesHandlers({ locale, label: "${name}", type: "object" }))`
          : `joiArray({ body: ${fileValSchema}.messages(messagesHandlers({ locale, label: "${name}", type: "object" })), locale, ${[
              max && `max: ${max}`,
              min && `min: ${minValue}`,
              required && `required: ${isRequired}`,
            ]
              .filter(Boolean)
              .join(",")} })`;
      };

      const array = () =>
        `joiArray({ body: Joi.object({ ${field.fields
          .map((f) => `${f.name}: ${parseField(f)}`)
          .join(",")} }), locale, ${[
          min && `min: ${minValue}`,
          required && `required: ${isRequired}`,
        ]
          .filter(Boolean)
          .join(",")} })`;

      const relation = () => {
        if (!ref) return null;
        const ref_key = pluralize.singular(ref);
        const relationSchema = `${ref_key}val`;
        imports += `import { ${relationSchema} } from "@/_Dashboard/configuration/modules/collections/${ref_key}/${ref_key}.validation";\n`;
        return single
          ? `${relationSchema}(locale, false)${required ? ".required()" : ""}`
          : `joiArray({ body: ${relationSchema}(locale, true), locale, ${[
              min && `min: ${minValue}`,
              required && `required: ${isRequired}`,
            ]
              .filter(Boolean)
              .join(",")} })`;
      };

      const boolean = () =>
        `Joi.boolean().messages(messagesHandlers({ locale, label: "${name}", type: "boolean" }))${
          required ? ".required()" : ""
        }`;
      const object = () => {
        return `joiObject({
            body: { 
              ${field.fields
                .map((f) => `${f.name}: ${parseField(f)}`)
                .join(", ")},
              ...commonVal
            },
            locale,
            ${isRequired ? "isRequired: true" : ""}
          })`;
      };

      const allTypes = {
        text,
        textarea: text,
        enum: text,
        date: text,
        array,
        media,
        relation,
        boolean,
        object,
      };
      if (allTypes[type]) return allTypes[type]();
      if (key === "metadata") return `pageMetadataValClient(locale)`;
      console.warn(
        `⚠️  Can't recognize type "${type}" in field "${name}" of module "${schemaName}".`
      );
      return null;
    };

    const bodyContent = schema.fields
      .map((field) => {
        const field_val = parseField(field);
        if (!field_val) return;
        return `${field?.name || field?.key}: ${field_val},`;
      })
      .filter(Boolean)
      .join("\n  ");

    const result = `${imports}
export const ${schemaName}Val = (locale = "en", relation = false) => Joi.object({
  ${bodyContent}
  ...commonVal,
});`;
    const fileName = `${schemaName}.validation.js`;
    const outputPath = path.join(destinationPath, fileName);
    fs.writeFileSync(outputPath, result);
    console.log(`✅ Validation ${schemaName} created successfully!`);
    return fileName;
  } catch (error) {
    console.error(
      `❌ Error while creating ${schemaName}.validation.js file:`,
      error
    );
    return null;
  }
};

export default generateValidation;

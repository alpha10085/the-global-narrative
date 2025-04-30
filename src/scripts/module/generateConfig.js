import fs from "fs";
import path from "path";
import pluralize from "pluralize";
import { getRootpath } from "../helpers.js";
const { rootSrcPath } = getRootpath;
export const generateConfig = ({ name, type }) => {
  try {
    const filePath = path.join(
      rootSrcPath,
      "_Dashboard",
      "configuration",
      "modules",
      type,
      name
    );
    fs.mkdirSync(filePath, { recursive: true });
    const schemaPath = path.join(filePath, `${name}.config.js`);

    const pluralSchemaName = type === "collections" ? pluralize(name) : name;

    fs.writeFileSync(
      schemaPath,
      `import ${name}Schema from "../../../../../modules/${type}/${name}.schema.json";
import { ${name}Val } from "./${name}.validation";

export const ${name}Config = {
  key: "${pluralSchemaName}",
  displayName: "${pluralSchemaName}",
  type: "${type}",
  schema: ${name}Schema,
  validation: ${name}Val,
};
`
    );
    console.log(`Created module config: ${name}`);
  } catch (error) {
    console.error("Error creating configuration file:", error);
  }
};

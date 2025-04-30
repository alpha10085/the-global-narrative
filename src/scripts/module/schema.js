import fs from "fs";
import path from "path";

const generateSchema = ({
  name,
  schema = {},
  destinationPath_schema: destinationPath,
  cacheTree = {},
  handleAddToCacheTree = () => {},
}) => {
  try {
    const clonedSchema = { ...schema };
    const parseField = (items) => {
      if (!items || !Array.isArray(items.fields)) return;

      items.fields.forEach((item) => {
        if (
          ["object", "array"].includes(item.type) &&
          Array.isArray(item.fields)
        ) {
          parseField(item);
          return;
        }

        if (item.type === "relation" && item.ref) {
          handleAddToCacheTree(name, item?.ref);
        }
      });
    };
    parseField(clonedSchema);
    clonedSchema.options.cache.tags = [
      ...new Set([
        ...(Array.isArray(clonedSchema?.options?.cache?.tags)
          ? clonedSchema?.options?.cache?.tags
          : []),
        ...(Array.isArray(cacheTree[name]) ? cacheTree[name] : []),
      ]),
    ].filter(Boolean);
    const  fileName = `${name}.schema.json`
    const outputPath = path.join(destinationPath, fileName);
    fs.writeFileSync(outputPath, JSON.stringify(clonedSchema));
    return fileName
  } catch (error) {
    console.error("Error creating Schema file:", error);
    return null;
  }
};

export default generateSchema;

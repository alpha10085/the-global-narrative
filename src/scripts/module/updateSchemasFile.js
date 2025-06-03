import fs from "fs";
import path from "path";
import { getRootpath } from "../helpers.js";
import { systemLogger } from "@/utils/consoleProxy.js";
const { rootSrcPath } = getRootpath;
const updateSchemsFile = ({ name, type }) => {
  const filePath = path.join(
    rootSrcPath,
    "_Dashboard",
    "configuration",
    "schemas.js"
  ); // Adjust the path if needed

  // Read the existing file content
  let content = fs.readFileSync(filePath, "utf-8");
  const importPath = `"./modules/${type}/${name}/${name}.config"`;
  const importName = `${name}Config`;
  // Check if the import already exists
  if (!content.includes(importPath)) {
    // Add the new import
    content = content.replace(/(import .* from ".*";\n)+/, `$&;\n`);
    content = `import { ${importName} } from  ${importPath};\n` + content;
  }
  // Add the new entry to the schemas array
  content = content.replace(
    /const schemas = \[(.*?)\];/s,
    (match, existingEntries) => {
      let lines = existingEntries.split("\n");
      let insertIndex = lines.findIndex(
        (line) => line.trim() && !line.trim().startsWith("//")
      );

      if (insertIndex === -1) insertIndex = lines.length; 
      if (!lines.some((line) => line.includes(importName))) {
        lines.splice(insertIndex, 0, `  ${importName},`);
      }

      return `const schemas = [\n${lines.join("\n").trim()}\n];`;
    }
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, "utf-8");
  systemLogger("schemas.js updated successfully!");
};

export default updateSchemsFile;



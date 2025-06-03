import { getRootpath } from "@/utils/fs";
import { systemLogger } from "@/utils/consoleProxy";
import fs from "fs";
import path from "path";

export const createComponent = ({
  name = "",
  pathToFile = [],
  styles = false,
  helpers = false,
  icons = false,
} = {}) => {
  try {
    if (!name) throw new Error("must send name");
    const folderPath = path.join(
      getRootpath.rootSrcPath,
      "components",
      ...pathToFile,
      name
    );

    if (fs.existsSync(folderPath))
      return next({
        message: `❌ ${name} folder already exists!`,
      });

    fs.mkdirSync(folderPath, { recursive: true });
    const componentPath = path.join(folderPath, `${name}.jsx`);

    // Properly formatted component content
    const pageContent = `import styles from "./${name}.module.css";

const ${name} = () => {
  return (
    <div className={styles.container}>
      ${name}
    </div>
  );
};

export default ${name};
`;

    fs.writeFileSync(componentPath, pageContent);

    if (styles) {
      const stylesPath = path.join(folderPath, `${name}.module.css`);
      fs.writeFileSync(
        stylesPath,
        `.container {

}`
      );
    }
    if (helpers) {
      const helpersPath = path.join(folderPath, "helpers.js");
      fs.writeFileSync(helpersPath, `// Add helper functions here`);
    }
    if (icons) {
      const iconsPath = path.join(folderPath, "icons.jsx");
      fs.writeFileSync(iconsPath, `"use client";\n`);
    }

    return true;
  } catch (error) {
    systemLogger("🚀 ~ createComponent ~ error:", error);
    return false;
  }
};

import { systemLogger } from "@/utils/consoleProxy";
import fs from "fs";
import path from "path";

/**
 * Formats the input string into an array of path segments.
 * - Replaces backslashes `\` and newlines `\n` with `-`
 * - Converts camelCase to kebab-case
 * - Converts to lowercase
 * - Splits by `-` or `/`
 * - Removes empty values
 */
const formatInput = (input) =>
  input
    .replace(/\\|\n/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .split(/[-\/]/)
    .filter(Boolean);

/**
 * Capitalizes the first letter of a word.
 */
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Generates a formatted component name based on the given path parts.
 * - If the first part has a dynamic segment `[param]`, it appends "Details".
 * - Capitalizes each part.
 */
const getFormattedName = (parts) =>
  parts.length
    ? parts
        .map((part, index) =>
          part.startsWith("[")
            ? "" // Ignore dynamic segments
            : index === 0 && parts.some((p) => p.startsWith("["))
            ? capitalize(part.replace(/s$/, "") + "Details") // Handle plural names
            : capitalize(part)
        )
        .filter(Boolean)
        .join("")
    : "";

/**
 * Generates a Next.js page with optional styles, API integration, and metadata.
 * @param {Object} options - Configuration options.
 * @param {string} options.path - The root path for the project.
 * @param {string} options.name - The name of the page to generate.
 * @param {boolean} options.styles - Whether to create a styles file.
 * @param {boolean} options.withApi - Whether the page should include API-related logic.
 * @param {boolean} options.metadata - Whether to include metadata handling.
 * @param {boolean} options.makeComponent - Whether to create a corresponding component folder.
 * @returns {boolean|null} - Returns `true` if successful, `null` if an error occurs.
 */
const generatePage = ({
  path: rootPath,
  name = "",
  styles = true,
  withApi = true,
  metadata = true,
  makeComponent = true,
}) => {
  try {
    const paths = formatInput(name);
    if (!paths.length) return systemLogger("❌ Name is required!");

    // Define paths for the new page and components
    const folderPath = path.posix.join(rootPath, "app", "[locale]", "(routes)", ...paths);
    const componentPath = path.posix.join(rootPath, "components");

    // Check if the folder already exists
    if (fs.existsSync(folderPath)) return systemLogger(`❌ ${name} folder already exists!`);

    // Create the page directory
    fs.mkdirSync(folderPath, { recursive: true });

    // Define file paths
    const pagePath = path.join(folderPath, "page.jsx");
    const stylesPath = path.join(folderPath, "styles.module.css");

    // Extract dynamic path segments (e.g., `[id]`)
    const dynamicPath = paths
      .filter((part) => part.startsWith("[") && part.endsWith("]"))
      .map((part) => part.slice(1, -1)); // Remove brackets

    // Construct endpoint, replacing dynamic segments with template literals
    const endpoint = paths
      .map((part) => (part.startsWith("[") ? `\${${part.slice(1, -1)}}` : part))
      .join("/");

    // Generate the page content
    const pageContent = `
${styles ? `import styles from "./styles.module.css";` : ""}
${!dynamicPath.length ? `import { metadataHandler } from "@/utils/metadata";\nimport { getPage } from "@/lib/pages";` : ""}
${metadata && !dynamicPath.length ? `// export const generateMetadata = metadataHandler(getPage, \`${endpoint}\`);` : ""}
const Page = async (props) => {
  ${withApi && dynamicPath.length ? `const { ${dynamicPath?.map((val) => `${val} = "" ` ).join(", ")} } = await props.params;` : ""}
  ${withApi && !dynamicPath.length ? `// const data = await getPage(\`${endpoint}\`);` : ""}
   return (
  <section className={\`${styles ? "${styles.container}" : ""}\`}>
  
  </section>
  );
};

export default Page;
    `.trim();

    // Write the page file
    fs.writeFileSync(pagePath, pageContent);

    // Write the styles file if enabled
    if (styles) fs.writeFileSync(stylesPath, "");

    // Create a component folder if enabled
    if (makeComponent) {
      const formattedName = getFormattedName(paths);
      if (formattedName) {
        const componentsPath = path.join(componentPath, formattedName);
        if (!fs.existsSync(componentsPath)) {
          fs.mkdirSync(componentsPath, { recursive: true });
        } else {
          systemLogger(`❌ components/${formattedName} folder already exists!`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error creating page or styles files:", error);
    return null;
  }
};

export default generatePage;

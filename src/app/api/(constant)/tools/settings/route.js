import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import { readFile, appendFile } from "@/_Backend/utils/fs";
import { getRootpath } from "@/scripts/helpers";
import path from "path";
import fs from "fs";
import { getEnvFile, updateEnvFile } from "../server/services";
// Function to convert JavaScript-like syntax to JSON-compliant syntax
const nextConfigPath = path.join(getRootpath.rootPath, "next.config.mjs");
function parseNextConfig(inputString) {
  const configRegex = /const\s+nextConfig\s*=\s*({[\s\S]*?});/;
  const match = inputString.match(configRegex);

  if (match) {
    const nextConfigString = match[1];
    const nextConfig = eval(`(${nextConfigString})`);
    return nextConfig;
  }

  return null; // In case the config doesn't match the expected format
}
const updateNextConfig = async (fileContent, newnextConfig = {}) => {
  // Regular expression to match and capture the nextConfig assignment in the file content
  const configRegex = /const\s+nextConfig\s*=\s*({[\s\S]*?});/;
  const match = fileContent.match(configRegex);

  if (match) {
    // Extract the nextConfig object as a string
    const nextConfigString = match[1];

    // Parse the nextConfig string to an object
    const nextConfig = eval(`(${nextConfigString})`);

    // Deeply merge the current nextConfig with the new configuration
    const updatedConfig = { ...nextConfig, ...newnextConfig };

    // Function to handle formatting, ensuring strings are wrapped in quotes
    const formatValue = (value) => {
      if (typeof value === "string") {
        return `"${value}"`; // Wrap string values in quotes
      } else if (Array.isArray(value)) {
        return `[${value.map((item) => formatValue(item)).join(", ")}]`; // Format array items
      } else if (typeof value === "object" && value !== null) {
        return `{ ${Object.entries(value)
          .map(
            ([nestedKey, nestedValue]) =>
              `${nestedKey}: ${formatValue(nestedValue)}`
          )
          .join(", ")} }`; // Format nested objects
      } else {
        return value; // For other primitive values (booleans, numbers, etc.)
      }
    };

    // Convert the updated config back to a string while preserving the format
    const updatedConfigString = Object.entries(updatedConfig)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join(",\n");

    // Ensure the last comma is removed and wrap the entire config in curly braces
    const updatedConfigFinalString = `const nextConfig = {\n${updatedConfigString}\n};`;

    // Replace the old nextConfig object in the file content with the updated one
    const updatedFileContent = fileContent.replace(
      configRegex,
      updatedConfigFinalString
    );

    // Write the updated content back to the file
    const result = fs.writeFileSync(nextConfigPath, updatedFileContent);
  }

  return true;
};

const getNextConfigFile = async () => {
  const fileContent = await readFile(nextConfigPath);
  return {
    nextObject: parseNextConfig(fileContent),
    file: fileContent,
  };
};

export const GET = AsyncHandler(
  async (req, res, next) => {
    const nextConfig = (await getNextConfigFile())?.nextObject;
    const environmentfile = await getEnvFile();
    return res({
      nextConfig,
      environment: environmentfile,
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);
export const PUT = AsyncHandler(
  async (req, res, next) => {
    const nextConfig = req?.body || {};
    const { file, nextObject } = await getNextConfigFile();

    if (nextConfig?.imagesDomains) {
      nextObject.images.domains = nextConfig?.imagesDomains;
    }
    if (typeof nextConfig?.reactStrictMode === "boolean") {
      nextObject.reactStrictMode = nextConfig?.reactStrictMode;
    }
    if (typeof nextConfig?.scrollRestoration === "boolean") {
      nextObject.experimental.scrollRestoration = nextConfig?.scrollRestoration;
    }
    const result = await updateNextConfig(file, nextObject).catch((error) => {
      console.log(error);
    });

    res({
      data: nextObject,
      message: "success",
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);

export const POST = AsyncHandler(
  async (req, res, next) => {
    const newEnv = req.body;
    updateEnvFile(newEnv, true);
    return res({
      message: "success",
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);

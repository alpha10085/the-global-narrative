import { readFile } from "@/utils/fs";
import { getRootpath } from "@/scripts/helpers";
import fs from "fs";
import path from "path";

function formatEnvFile(envContent) {
  return envContent.split("\n").reduce((acc, line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return acc;
    const [key, ...value] = line.split("=");
    acc[key.trim()] = value.join("=").trim().replace(/^"|"$/g, "");
    return acc;
  }, {});
}
export const getEnvFile = async () => {
  const envPath = path.join(getRootpath.rootPath, ".env");
  const envFile = await readFile(envPath);
  return formatEnvFile(envFile);
};


export const updateEnvFile = (envVars = {} , replaceMode = false) => {
  const envPath = path.join(getRootpath.rootPath, ".env");
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, "");
  }
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  const seenKeys = new Set();
  const updatedLines = lines
    .map((line) => {
      const trimmed = line.trim();

      // Preserve comments and empty lines
      if (trimmed === "" || trimmed.startsWith("#")) return line;

      const [key, ...rest] = line.split("=");
      const cleanKey = key.trim();

      if (envVars.hasOwnProperty(cleanKey)) {
        seenKeys.add(cleanKey);
        return `${cleanKey}=${envVars[cleanKey]}`;
      }

      // Remove keys not in envVars
      return replaceMode ? null : line;
    }).filter((line) => line !== null);

  // Append new keys that weren't in the original file
  for (const [key, value] of Object.entries(envVars)) {
    if (!seenKeys.has(key)) {
      updatedLines.push(`${key}=${value}`);
    }
  }

  fs.writeFileSync(envPath, (updatedLines.join("\n") + "\n").trim(), "utf8");
};



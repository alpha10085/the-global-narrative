import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "..", ".."); // Moves out of "scripts" to project root

const rootSrcPath = path.join(rootPath, "src");
export const getRootpath = {
  rootPath,
  rootSrcPath,
};
const formateFile = (content = "") => {
  if (!content) return "";
  if (typeof content === "object") return JSON.stringify(content, null, 2);
  return content
    .split("\n")
    .map((line) => line.trimEnd()) // optional: remove trailing spaces
    .filter((line) => line.trim() !== "") // remove empty lines
    .join("\n");
};

const importFile = (content, paths = []) => {
  const header = paths.join("\n");
  return `${header}\n${content}`;
};
const readFile = async (file_path) => {
  try {
    const data = fs.readFileSync(file_path, "utf-8") || null;
    if (file_path.endsWith("json")) {
      return JSON.parse(data);
    }
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

const writeFile = async (
  file_path,
  data,
  options = {
    autoFormate: true,
    overwrite: true,
    throwError: false,
  }
) => {
  try {
    const { autoFormate, overwrite, throwError } = options;
    if (!overwrite && readFile(file_path)) {
      throw new Error(`file is aready existing`);
    }
    if (autoFormate) {
      data = formateFile(data);
    }
    fs.writeFileSync(file_path, data, "utf-8");
    return { message: "File written successfully" };
  } catch (error) {
    if (throwError) {
      throw new Error(`Error writing file: ${error.message}`);
    } else {
      return null;
    }
  }
};

const deleteFile = async (file_path) => {
  try {
    fs.unlinkSync(file_path);
    return { message: "File deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

const listFolders = async (file_path) => {
  const traverse = async (currentPath) => {
    const result = {
      name: path.basename(currentPath),
      type: "folder",
      children: [],
    };
    try {
      const items = fs.readdirSync(currentPath, { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(currentPath, item.name);
        if (item.isDirectory()) {
          result.children.push(await traverse(fullPath));
        } else {
          result.children.push({ name: item.name, type: "file" });
        }
      }
    } catch (error) {
      throw new Error(`Error listing folders and files: ${error.message}`);
    }
    return result;
  };
  return traverse(file_path);
};

const checkisExists = (...file_path) => {
  const handler = (val) => fs.existsSync(val);
  if (Array.isArray(file_path)) {
    const result = file_path.map(handler);
    return result?.filter(Boolean)?.length > 0;
  }
};

const createFolder = (pagePath) => {
  return fs.mkdirSync(pagePath, { recursive: true });
};

export {
  importFile,
  formateFile,
  readFile,
  writeFile,
  deleteFile,
  listFolders,
  checkisExists,
  createFolder,
  path,
  fs
};

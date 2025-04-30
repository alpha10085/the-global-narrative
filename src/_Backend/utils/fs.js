import fs from "fs";
import path from "path";

const readFile = async (file_path) => {
  try {
    const data = fs.readFileSync(file_path, "utf-8");
    if (file_path.endsWith("json")) {
      return JSON.parse(data);
    }
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

const writeFile = async (file_path, data) => {
  try {
     fs.writeFileSync(file_path, JSON.stringify(data, null, 2), "utf-8");
    return { message: "File written successfully" };
  } catch (error) {
    throw new Error(`Error writing file: ${error.message}`);
  }
};

const appendFile = async (file_path, data) => {
  try {
     fs.appendFileSync(file_path, `\n${JSON.stringify(data)}`, "utf-8");
    return { message: "Data appended successfully" };
  } catch (error) {
    throw new Error(`Error appending file: ${error.message}`);
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
      const items =  fs.readdirSync(currentPath, { withFileTypes: true });
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

export { readFile, writeFile, appendFile, deleteFile, listFolders };

import readline from "readline/promises";
import generateValidation from "./validation.js";
import { getRootpath, reStartServer } from "../helpers.js";
import generateSchema from "./schema.js";
import fs from "fs";
import path from "path";
import pluralize from "pluralize";
import modules from "../../modules/config.js";
import { generateConfig } from "./generateConfig.js";
import updateSchemasFile from "./updateSchemasFile.js";

const { rootSrcPath } = getRootpath;
// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  try {
    // cache tree
    const cacheTree = {};
    // cache tree onChange => handler
    const handleAddToCacheTree = (parent, item) => {
      // handle convrt key to singular version exmaple
      // users => users , category => categories
      const key = pluralize.singular(item);
      // update cache tree
      cacheTree[key] = [cacheTree[key], parent].filter(Boolean);
    };
    // error loger
    const logError = (msg) => {
      console.log("❌", msg);
    };
    modules.forEach((schema) => {
      //  step 1 check schema type
      if (!["collections", "pages", "private"].includes(schema?.type)) {
        // log error of not allowed
        return logError(
          "type must be one of collections | pages | private  - not: ",
          schema?.type
        );
      }
      // step 2 prepare destination Path ( validation )
      const destinationPath_val = path.join(
        rootSrcPath,
        "_Dashboard",
        "configuration",
        "modules",
        schema?.type,
        schema?.name
      );
      // step 3 prepare destination path schema ( schema )
      const destinationPath_schema = path.join(
        rootSrcPath,
        "modules",
        schema?.type
      );
      // step 4 make mkdirSync
      fs.mkdirSync(destinationPath_val, { recursive: true });
      // step 5 generate config variables
      const config = {
        cacheTree,
        destinationPath_val,
        destinationPath_schema,
        handleAddToCacheTree,
        ...schema,
      };
      // step 6:1 generate schema file
      const schemarResult = generateSchema(config);
      // check result and abort on error
      if (!schemarResult) return logError("Failed to create Schema!");
      // step 6:2 generate validation file
      const validationrResult = generateValidation(config);
      // check result and abort on error
      if (!validationrResult) return logError("Failed to create Validation!");
      // step 6:3  config file
      generateConfig(schema);
      // step 6:4 update  schemas file config (connect the new module)
      updateSchemasFile(schema);
    });
    console.log(`🚀 script finished !`);
    // step 7 reStart the Server .
    reStartServer();
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    rl.close();
  }
})();

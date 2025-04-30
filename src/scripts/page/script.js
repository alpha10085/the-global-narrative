import readline from "readline/promises";
import generatePage from "./helpers.js";
import { getRootpath, reStartServer } from "../helpers.js";

const { rootSrcPath } = getRootpath;
// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  try {
    let name = (await rl.question("Enter page name: ")).trim();
    if (!name) {
      console.log("❌ page name is required!");
      rl.close();
      return;
    }

    const pageConfig = {
      name,
      styles: true,
      metadata: true,
      path: rootSrcPath,
      makeComponent: true,
      withApi: true,
    };
    const result = generatePage(pageConfig);
    if (!result) {
      console.log("Failed to create page!");
      rl.close();
      return;
    }
    console.log(`✅ page "${name}" created successfully !`);
    reStartServer();
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    rl.close();
  }
})();

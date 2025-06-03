import readline from "readline/promises";
import generatePage from "./helpers.js";
import { getRootpath, reStartServer } from "../helpers.js";
import { systemLogger } from "@/utils/consoleProxy.js";

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
      systemLogger("❌ page name is required!");
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
      systemLogger("Failed to create page!");
      rl.close();
      return;
    }
    systemLogger(`✅ page "${name}" created successfully !`);
    reStartServer();
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    rl.close();
  }
})();

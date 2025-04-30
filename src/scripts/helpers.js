import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "..", ".."); // Moves out of "scripts" to project root
const rootPath2 = path.join(__dirname, "..", "..", ".."); // Moves out of "scripts" to project root

const rootSrcPath = path.join(rootPath, "src");
export const getRootpath = {
  rootPath,
  rootPath2,
  rootSrcPath,
};
export const reStartServer = () => {
  console.log("🚀 Restarting server with npm run dev...");
  const serverProcess = spawn("npm", ["run", "dev"], {
    stdio: "inherit", // Show logs in terminal
    shell: true, // Ensures cross-platform compatibility
    cwd: rootPath, // Ensure it's running in the project root
  });

  serverProcess.on("exit", (code) => {
    console.log(`🔄 Server process exited with code ${code}`);
  });
};

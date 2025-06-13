import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Optional: Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWindows = process.platform === "win32";
const nextCmd = isWindows
  ? ".\\node_modules\\.bin\\next.cmd"
  : "./node_modules/.bin/next";

const watch = spawn("node", ["src/scripts/watch.js"], { stdio: "inherit" });
const next = spawn(nextCmd, ["dev", "--turbopack"], {
  stdio: "inherit",
  shell: true,
});

const exitHandler = () => {
  watch.kill();
  next.kill();
  process.exit();
};

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);

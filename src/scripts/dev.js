import { updateEnvFile } from "../app/api/(constant)/tools/server/services.js";
import { nextCmd, runScript } from "./helpers.js";

// Set env mode to "pro" before starting
 updateEnvFile({ NEXT_PUBLIC_MODE: "dev" });

const next = runScript({
  cmd: nextCmd,
  key: "dev --turbopack",
});
const watch = runScript({
  key: "src/scripts/watch.js",
});

const exitHandler = () => {
  // Reset to "dev" on exit
  watch.kill();
  next.kill();
  process.exit();
};

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);

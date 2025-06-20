import { updateEnvFile } from "../app/api/(constant)/tools/server/services.js";
import { nextCmd, runScript } from "./helpers.js";

// Set env mode to "pro" before starting
 updateEnvFile({ NEXT_PUBLIC_MODE: "pro" });

const next = runScript({
  cmd: nextCmd,
  key: "build && start",
});

const exitHandler = () => {
  // Reset to "dev" on exit
  updateEnvFile({ NEXT_PUBLIC_MODE: "dev" });
  next.kill();
  process.exit();
};

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);

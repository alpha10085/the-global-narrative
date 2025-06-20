import { spawn } from "child_process";

const isWindows = process.platform === "win32";

export const nextCmd = isWindows
  ? ".\\node_modules\\.bin\\next.cmd"
  : "./node_modules/.bin/next";

/**
 * Inserts cmd after every '&&' in an array.
 */
const insertCmdAfterAnd = (arr, cmd) =>
  arr.flatMap((item) => (item === "&&" ? [item, cmd] : [item]));

/**
 * Spawns a command with optional `&&` injection.
 *
 * @param {Object} params
 * @param {string} params.cmd - Command to run (e.g., "node", "next")
 * @param {string} params.key - Command arguments (as string)
 * @param {Object} params.options - spawn options
 * @returns {ChildProcess}
 */
export const runScript = ({
  cmd = "node",
  key = "",
  options = { stdio: "inherit", shell: true },
}) => {
  const args = insertCmdAfterAnd(key.trim().split(/\s+/), cmd);
  return spawn(cmd, args, options);
};

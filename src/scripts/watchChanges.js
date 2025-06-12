// src/scripts/watchChanges.js
import { fs, getRootpath, path } from "../utils/fs.js";
import { watch } from "chokidar";
import { execSync } from "child_process";

const gitUserName = execSync("git config user.name").toString().trim();
if (!gitUserName) {
  console.error(
    'Git user.name is not set. Run `git config --global user.name "Your Name"`.'
  );
  process.exit(1);
}
const LOG_FILE = path.join(
  getRootpath.rootPath,
  ".tmp",
  gitUserName,
  "file-changes.json"
);

if (!fs.existsSync(LOG_FILE)) {
  try {
    fs.mkdirSync(path.join(getRootpath.rootPath, ".tmp", gitUserName), {
      recursive: true,
    });
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
  } catch (e) {
    console.error("Error initializing log file:", e);
  }
}

const watchFolders = [
  ".env",
  "src/utils",
  "package.json",
  "next.config.mjs",
  "jsconfig.json",
  "src/middlewares",
  "src/lib/actions.js",
  "src/lib/tools.js",
  "src/lib/auth.js",
  "src/i18n",
  "src/hooks",
  "src/config",
  "src/contexts",
  "src/components/Shared",
  "src/app/(dashboard)",
  "src/app/api/(constant)",
  "src/app/api/components",
  "src/app/api/pages",
  "src/app/helpers.js",
  "src/_DevTools",
  "src/_Dashboard/commens",
  "src/_Dashboard/components",
  "src/_Dashboard/lib",
  "src/_Dashboard/context",
  "src/_Dashboard/hooks",
  "src/_Dashboard/layouts",
  "src/_Dashboard/services",
  "src/_Backend/assets",
  "src/_Backend/commons",
  "src/_Backend/database/models/constant",
  "src/_Backend/middlewares",
  "src/_Backend/modules/_constant",
  "src/_Backend/services",
  "src/_Backend/utils",
];

const watcher = watch(watchFolders, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true,
});

console.log("👀 Watching for file changes...");

function logChange(type, filePath) {
  try {
    const stat = fs.lstatSync(filePath);
    if (!stat.isFile()) return;

    const time = new Date().toLocaleString();
    const relativePath = path.relative(process.cwd(), filePath);

    let data = [];
    try {
      data = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch {
      data = [];
    }

    const index = data.findIndex((entry) => entry.file === relativePath);

    if (index !== -1) {
      data[index].count += 1;
      data[index].lastUpdatedAt = time;
      data[index].lastType = type;
    } else {
      data.push({
        file: relativePath,
        firstSeenAt: time,
        lastUpdatedAt: time,
        lastType: type,
        count: 1,
      });
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2));
    console.log(`[${time}] ${type.toUpperCase()}: ${relativePath}`);
  } catch (err) {
    if (err.code !== "EISDIR") console.error("Error logging change:", err);
  }
}

watcher
  .on("add", (filePath) => logChange("added", filePath))
  .on("change", (filePath) => logChange("changed", filePath))
  .on("unlink", (filePath) => logChange("removed", filePath));

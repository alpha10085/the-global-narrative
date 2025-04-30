// utils/ConsoleInterceptor.js
import ObjectID from "bson-objectid";
import { isEqual } from "lodash";

export class ConsoleInterceptor {
  constructor() {
    this.logStore = [];
    this.original = {
      log: console.log,
      warn: console.warn,
      error: console.error,
    };
    this.active = false;
  }

  getLogs() {
    return this.logStore;
  }

  clear() {
    this.logStore = [];
  }

  intercept() {
    this.logStore = [];
    if (this.active) return; // prevent double-binding
    this.active = true;

    const addMessage = (type, args) => {
      const time = new Date()
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
        .replace(/ AM| PM/, "");

      if (args.toString().includes("[Fast Refresh]")) return;

      let filteredArgs = args
        .map((arg) =>
          typeof arg === "string" ? arg.replace(/%c|%s/g, "").trim() : arg
        )
        .filter(
          (arg) => !(typeof arg === "string" && arg.startsWith("background:"))
        )
        .filter((arg) => arg != null && arg !== "");

      const getFilenameFromStack = () => {
        const stackLines = new Error().stack?.split("\n") || [];
        const index = stackLines.findIndex((line) =>
          line.includes("at console.")
        );
        if (index !== -1 && stackLines[index + 1]) {
          const match = stackLines[index + 1].trim().match(/^at (\w+)/);
          return match?.[1] || "react system";
        }
        return "react system";
      };

      const newLog = {
        type,
        time,
        filename: getFilenameFromStack(),
        args: filteredArgs,
        server: true,
        key: null,
        repeated: 0,
        timePremilli: Date.now(),
      };

      const last = this.logStore[this.logStore.length - 1];
      if (
        last &&
        last.type === newLog.type &&
        last.filename === newLog.filename &&
        last.time === newLog.time &&
        isEqual(last.args, newLog.args)
      ) {
        last.repeated += 1;
      } else {
        this.logStore.push({ ...newLog, key: ObjectID().toHexString() });
      }
    };

    console.log = (...args) => {
      this.original.log(...args);
      addMessage("log", args);
    };
    console.warn = (...args) => {
      this.original.warn(...args);
      addMessage("warn", args);
    };
    console.error = (...args) => {
      this.original.error(...args);
      addMessage("error", args);
    };
  }

  restore() {
    console.log = this.original.log;
    console.warn = this.original.warn;
    console.error = this.original.error;
    this.active = false;
  }
}

// ✅ Singleton export for shared use
const interceptor = new ConsoleInterceptor();
export default interceptor;

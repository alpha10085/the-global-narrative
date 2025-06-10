import { isProductionMode } from "@/config/main";

const { log: logger, warn: warnLogger, error: errorLogger } = console;

export function disableConsole() {
  if (!isProductionMode) return;

  const sanitizeArgs = (args) => {
    if (args?.[0] === "system-000-logger-000") {
      return args.slice(1); // remove the flag
    }
    return args;
  };

  const loggerFn = (...args) => {
    const cleaned = sanitizeArgs(args);
    return logger(...cleaned);
  };

  const warnFn = (...args) => {
    const cleaned = sanitizeArgs(args);
    return warnLogger(...cleaned);
  };

  const errorFn = (...args) => {
    const cleaned = sanitizeArgs(args);
    return errorLogger(...cleaned);
  };

  const types = {
    log: loggerFn,
    warn: warnFn,
    error: errorFn,
    info: loggerFn,
    debug: loggerFn,
  };

  Object.keys(types).forEach((method) => {
    if (typeof console[method] === "function") {
      console[method] = types[method];
    }
  });
}

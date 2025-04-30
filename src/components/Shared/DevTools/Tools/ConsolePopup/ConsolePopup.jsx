"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ConsolePopup.module.css";
import "react18-json-view/src/style.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import eventBus from "@/utils/eventBus";
import LogEntry from "./LogEntry/LogEntry";
import CloseIcon from "@mui/icons-material/Close";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import useDynamicState from "@/hooks/useDynamicState";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import ObjectID from "bson-objectid";
import { isEqual } from "lodash";
import { delay } from "@/utils/delay";
const ConsolePopup = ({ logStore, onMouned }) => {
  const { data, isLoading = {} } = useLocalStorage("dev-tools-console");
  const [state, updateState, resetState, setState] = useDynamicState({
    logs: [...logStore],
    isMouseEneter: false,
    size: { width: 300, height: 0 },
    isHidden: false,
    loading: true,
  });

  const [allowedTypes, setAllowedTypes] = useState([]);

  const logsRef = useRef([...logStore]);
  const logsEndRef = useRef(null);
  const isResizing = useRef(false);
  const ismounted = useRef(null);
  const startSize = useRef({ width: 425, height: 900, x: 0, y: 0 });

  useLayoutEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const addMessage = (type, args) => {
      const timeWithPeriod = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const timeNow = timeWithPeriod.replace(/ AM| PM/, "");
      if (args.toString().includes("[Fast Refresh]")) return;

      let filteredArgs = args
        .map((arg, index) =>
          typeof arg === "string" ? arg.replace(/%c|%s/g, "").trim() : arg
        )
        .filter(
          (arg) => !(typeof arg === "string" && arg.startsWith("background:"))
        );

      let isServerLog = false;
      if (filteredArgs?.[1] === "Server" && filteredArgs?.length > 1) {
        filteredArgs = filteredArgs.filter((it, i) => i !== 1);
        isServerLog = true;
      }

      filteredArgs = filteredArgs.filter((arg) => arg != null && arg !== "");

      const getFilenameFromStack = () => {
        const error = new Error();
        const stack = error.stack?.split("\n") || [];

        for (let i = 1; i < stack.length; i++) {
          const line = stack[i].trim();

          // Skip lines from internal calls or this function itself
          if (
            /getFilenameFromStack|addMessage|console\.|log|warn|error|<anonymous>/.test(
              line
            )
          )
            continue;

          // Match function/component names (e.g., "at Home (...)" or "at Object.NavBar (...)")
          const match = line.match(/^at\s+([\w$.<>]+)\s*\(/);

          if (match && match[1]) {
            return match[1].split(".").pop();
          }
        }

        return "react system";
      };

      const filename = getFilenameFromStack();
      const newlog = {
        type,
        time: timeNow,
        filename,
        args: filteredArgs,
        server: isServerLog,
        key: null,
        repeated: 0,
      };

      const lastElemenet = logsRef.current.find((val) => {
        const isExists =
          val &&
          val?.type === newlog?.type &&
          val?.filename === newlog?.filename &&
          val?.time === newlog?.time &&
          isEqual(val.args, newlog.args);
        return isExists;
      });
      if (
        lastElemenet &&
        lastElemenet?.type === newlog?.type &&
        lastElemenet?.filename === newlog?.filename &&
        lastElemenet?.time === newlog?.time &&
        isEqual(lastElemenet.args, newlog.args)
      ) {
        lastElemenet.repeated += 1;
      } else {
        logsRef.current.push({
          ...newlog,
          key: ObjectID().toHexString(), // Unique ObjectId key
        });
      }

      if (ismounted.current) {
        requestAnimationFrame(() => updateState({ logs: logsRef.current }));
      }
    };

    console.log = (...args) => {
      originalLog(...args);
      addMessage("log", args);
    };
    console.warn = (...args) => {
      originalWarn(...args);
      addMessage("warn", args);
    };
    console.error = (...args) => {
      originalError(...args);
      addMessage("error", args);
    };

    onMouned();
    updateState({
      size: {
        height: window.innerHeight - 20,
        width: 425,
      },
    });
    delay(50).then(() => {
      ismounted.current = true;
      updateState({ logs: logsRef.current });
    });
    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  const startResizing = (e) => {
    e.preventDefault();
    isResizing.current = true;
    startSize.current = {
      width: state.size.width,
      height: state.size.height,
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
    document.addEventListener("mouseleave", stopResizing);
  };

  const resize = (e) => {
    if (!isResizing.current) return;

    updateState({
      size: {
        width: Math.min(
          window.innerWidth - 25,
          Math.max(
            425,
            startSize.current.width - (e.clientX - startSize.current.x)
          )
        ),
        height: Math.min(
          window.innerHeight - 20,
          Math.max(
            10,
            startSize.current.height - (e.clientY - startSize.current.y)
          )
        ),
      },
    });
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
    document.removeEventListener("mouseleave", stopResizing);
  };
  useEffect(() => {
    if (!isLoading) {
      setAllowedTypes([
        { type: "log", enable: !!data?.log },
        { type: "warn", enable: !!data?.warn },
        { type: "error", enable: !!data?.error },
      ]);
      updateState({
        loading: false,
      });
    }
  }, [JSON.stringify(data)]);
  const formatedLogs = state?.logs?.filter((item) =>
    allowedTypes?.some(
      (val) =>
        val?.type.toLowerCase() === item?.type.toLowerCase() && val?.enable
    )
  );
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [JSON.stringify(formatedLogs)]);
  const updateAllowedTypes = (key = "log", enabled = false) => {
    setAllowedTypes(
      allowedTypes?.map((item) => {
        if (item.type === key) {
          item.enable = enabled;
        }
        return item;
      })
    );
  };
  const allowAllTypes = () => {
    setAllowedTypes(
      allowedTypes?.map((item) => {
        item.enable = true;

        return item;
      })
    );
  };

  if (state?.loading || state.isHidden || !data?.enabled) return null;

  return (
    <div
      id="consolepopup"
      onMouseEnter={() => eventBus.emit("lenis", false, ["consolepopup"])}
      onMouseLeave={() => eventBus.emit("lenis", true)}
      style={{
        width: `${state.size?.width}px`,
        height: `${state.size?.height}px`,
        color: "white",
      }}
      className={`${styles.consolePopup}

      ${state.isMouseEneter && styles.active}`}
      onMouseDown={() => updateState({ isMouseEneter: true })}
      onMouseUp={() => updateState({ isMouseEneter: false })}
    >
      <div className="flex column gap10   pb10">
        <div className="flex gap15 al-i-c al-c-c">
          <div className={`${styles.headIcons} flex gap5 al-i-c`}>
            <div
              className={`${styles.resizer} ${styles.icon} flex-c`}
              onMouseDown={startResizing}
            >
              <ChevronLeftIcon />
            </div>
            <div
              className={`${styles.closeIcon} ${styles.icon} flex-c`}
              onClick={() => updateState({ isHidden: true })}
            >
              <CloseIcon />
            </div>
            <div
              className={`${styles.NotInterestedIcon} ${styles.icon} flex-c`}
              onClick={() => {
                updateState({ logs: [] });
                logsRef.current = [];
              }}
            >
              <NotInterestedIcon />
            </div>
          </div>
          <h1 className={styles.title}>all logs ({formatedLogs?.length})</h1>
        </div>
        <div className="flex  gap5">
          <div
            onClick={allowAllTypes}
            className={`${styles.categoryLogType} ${styles.all} ${
              allowedTypes.some((item) => !item?.enable) ? "" : styles.active
            }`}
          >
            All
          </div>
          {allowedTypes?.map((item) => (
            <div
              key={item?.type}
              onClick={() => updateAllowedTypes(item.type, !item?.enable)}
              className={`${styles.categoryLogType} ${styles[item.type]} ${
                item?.enable && styles.active
              }

              ${
                state?.logs?.find((v) => v?.type === item?.type)
                  ? styles.haslog
                  : ""
              }
              `}
            >
              {item?.type}
            </div>
          ))}
        </div>
      </div>
      <div
        onMouseLeave={() => {
          updateState({ isMouseEneter: false });
        }}
        className={styles.consoleContent}
      >
        {formatedLogs?.length ? (
          formatedLogs?.map((log, index) => (
            <LogEntry log={log} key={log?.key} />
          ))
        ) : (
          <div className={`${styles.emptyLogs} showSmooth flex-c gap5`}>
            <DoNotDisturbOnIcon />
            empty logs
          </div>
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default ConsolePopup;

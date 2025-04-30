import styles from "./LogEntry.module.css";
import JsonView from "react18-json-view";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/utils/clipboard";
import { useState } from "react";
import { delay } from "@/utils/delay";
import { customText } from "@/utils/text";
const LogEntry = ({ log = {} }) => {
  return (
    <div className={`showSmooth_c ${styles.logEntry}  ${styles[log?.type]}`}>
      <div className={`${styles.head} flex  gap10`}>
        <div className={`${styles.type} `} />
        <div className={`${styles.left} flex just-sb`}>
          <div className="flex al-i-c gap5">
            <div className={`${styles.time} flex al-i-c  gap5`}>
              <AccessTimeIcon />
              <span>{log?.time}</span>
            </div>
            {log?.repeated > 0 ? (
              <div className={`${styles.repeated} flex-c gap5`}>
                {log?.repeated + 1}
              </div>
            ) : (
              ""
            )}
            {log?.server && (
              <div className={`${styles.server} flex-c gap5`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-server-crash-icon lucide-server-crash"
                >
                  <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
                  <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
                  <path d="M6 6h.01" />
                  <path d="M6 18h.01" />
                  <path d="m13 6-4 6h6l-4 6" />
                </svg>
                server
              </div>
            )}
          </div>
          <div className={styles.filename}>{customText(log?.filename, 18)}</div>
        </div>
      </div>
      <div className={`${styles.args} flex wrap gap10 al-i-c`}>
        {(log?.args || [])?.map((arg, i) =>
          typeof arg === "object" && arg !== null ? (
            <div
              key={`json-view-${i}`}
              className={` ${styles.jsonEntry} w-100`}
            >
              <JsonView
                src={arg}
                className="json-view"
                dark
                collapsed={2}
                enableClipboard={true}
                displayDataTypes={true}
              />
            </div>
          ) : (
            <StringEntry arg={arg} key={`StringEntry-${i}`} />
          )
        )}
      </div>
    </div>
  );
};

const StringEntry = ({ arg = "" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (text) => {
    const result = copyToClipboard(String(text).trim());
    if (result) {
      setIsCopied(true);
    }
    delay(3000).then(() => {
      setIsCopied(false);
    });
  };
  return (
    <span
      onMouseOut={() => {
        if (isCopied) {
          delay(300).then(() => {
            setIsCopied(false);
          });
        }
      }}
      onClick={() => handleCopy(String(arg).trim())}
      className={`${styles.stringMessage} flex al-i-c gap10`}
    >
      {String(arg).trim()}
      <span
        className={`flex-c ${styles.iconCopy} ${isCopied && styles.active}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="json-view--copy"
        >
          <path
            fill="currentColor"
            d="M17.542 2.5h-4.75a3.963 3.963 0 0 0-3.959 3.958v4.75a3.963 3.963 0 0 0 3.959 3.959h4.75a3.963 3.963 0 0 0 3.958-3.959v-4.75A3.963 3.963 0 0 0 17.542 2.5Zm2.375 8.708a2.378 2.378 0 0 1-2.375 2.375h-4.75a2.378 2.378 0 0 1-2.375-2.375v-4.75a2.378 2.378 0 0 1 2.375-2.375h4.75a2.378 2.378 0 0 1 2.375 2.375v4.75Zm-4.75 6.334a3.963 3.963 0 0 1-3.959 3.958h-4.75A3.963 3.963 0 0 1 2.5 17.542v-4.75a3.963 3.963 0 0 1 3.958-3.959.791.791 0 1 1 0 1.584 2.378 2.378 0 0 0-2.375 2.375v4.75a2.378 2.378 0 0 0 2.375 2.375h4.75a2.378 2.378 0 0 0 2.375-2.375.792.792 0 1 1 1.584 0Z"
          ></path>
        </svg>
        <DoneIcon />
      </span>
    </span>
  );
};

export default LogEntry;

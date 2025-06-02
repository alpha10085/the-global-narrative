import Img from "@/components/shared/img/Img";
import React, { memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "@/components/shared/Spinner/Spinner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./Card.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { customText } from "@/utils/text";
import DisplayMedia from "../../DisplayMedia/DisplayMedia";
import Skeleton from "@/components/shared/Skeleton/skeleton";

const Card = ({ file, theme = {}, callBack = () => {}, index }) => {
  const { uploading = false, _id: response, progress, error } = file || {};  
  return (
    <div
      className={`${uploading && styles.uploading} ${styles.card} ${
        theme.bord20
      }  p-relative`}
    >
      {file?.url ? (
        <DisplayMedia
          theme={theme}
          className={styles.image}
          mainClassName={`${theme.bgMedia}`}
          {...file}
          type={file?.type}
          controls={false}
          autoPlay={false}
        />
      ) : (
        <Skeleton className={`${styles.loader}`} theme={theme?.name} />
      )}
      {error && (
        <div className={`${styles.bgoverlay} showSmooth flex-c column`}>
          <div className={`${styles.iconError} mt-10`}>
            <ErrorIcon />
            <h1>{error?.message || "Failed"}</h1>
          </div>
        </div>
      )}

      {!error && progress < 100 && (
        <div
          className={`${styles.bgoverlay}   showSmooth flex-c column`}
        >
          <div
            className={`${styles.progressBar} ${theme.bg200} flex  ${theme.bord20}`}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
              }}
              className={`${styles.progressBarValue} ${theme.bg_x}`}
            />
          </div>
          <div className={` showSmooth ${styles.progressValue}`}>
            {progress ? `${progress}%` : "Uploading..."}
          </div>
        </div>
      )}
      <div className={`${styles.fileinfo} ${theme.bg_overlay}`}>
        <h1>{customText(file?.fileName, 25)}</h1>
      </div>
      {error || progress > 95 ? (
        " "
      ) : (
        <button
          onClick={file?.abortCallback}
          disabled={progress > 95}
          className={`${styles.abortBtn} ${theme.bg_overlay} ${theme.color} flex-c`}
        >
          <CloseIcon className={styles.deleteIcon} />
        </button>
      )}
    </div>
  );
};

export default memo(Card, (prev, next) => {
  return (
    prev?.file?.url === next?.file?.url &&
    prev?.file?.uploading === next?.file?.uploading &&
    prev?.file?.error === next?.file?.error &&
    prev?.file?.progress === next?.file?.progress
  );
});

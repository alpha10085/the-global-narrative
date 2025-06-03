import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import styles from "./Popup.module.css";
import { useUploadFile } from "../ContextApi/FileUploadCTX";
import Img from "@/_components/Shared/img/Img";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneIcon from "@mui/icons-material/Done";
import AdjustIcon from "@mui/icons-material/Adjust";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import IosShareIcon from "@mui/icons-material/IosShare";
import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";
import DisplayMedia from "../../DisplayMedia/DisplayMedia";
const Popup = ({
  open,
  openWindow,
  files,
  uploading,
  pendingFiles,
  queue,
  clearQueue,
  filesUploaded,
  filesUploading,
  filesFaileded,
  totalFiles,
  translations,
  isSuccess,
}) => {
  const { theme } = useTheme();

  let mode = uploading ? queue : filesUploaded;
  let isAllFailed = filesFaileded?.length === files?.length;
  return (
    <div
      className={`${styles.container} ${open && styles.open} ${
        theme.color
      } flex ${theme?.backgroundOverlay} ${theme.bord10}`}
    >
      <div className={`${styles.left} flex wrap `}>
        {isAllFailed ? (
          <div
            className={`${styles.iconsFaild} ${theme.bg200} ${theme.bord20}  m-auto flex-c`}
          >
            <WifiTetheringErrorIcon />
          </div>
        ) : (
          mode?.slice(0, 4)?.map((file) => {
            return (
              <DisplayMedia
                key={file?.preview}
                theme={theme}
                className={`${
                  mode?.length === 1 ? styles.bigPoster : styles.poster
                } ${theme.bord20}`}
                mainClassName={`${theme.bgMedia}`}
                {...file}
                file={file?.file}
                url={file?.url || file?.preview}
                type={file?.type}
                controls={false}
                autoPlay={false}
              />
            );
          })
        )}
        {mode?.length - 4 > 0 ? (
          <div
            className={`${styles.overView} showSmooth flex-c ${theme.color} ${theme.bord20} ${theme.backgroundOverlay}`}
          >
            +{mode?.length - 4}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={`${styles.right} flex just-sb`}>
        <div className={`${styles.boxLeft} flex column  gap5`}>
          <div className={styles.head}>
            {uploading ? (
              <div className={`showSmooth ${styles.wrapUploadingTitle}`}>
                <h1
                  className={`${styles.overViewStatus} showSmooth ${styles.countUploading} al-i-c flex  gap5 ${styles.uploadingTitle}`}
                >
                  <HourglassBottomIcon />
                  {translations?.filesWindow?.uploading} {queue?.length}
                </h1>
              </div>
            ) : files.length ? (
              <div className={`showSmooth ${styles.overViewTitle}`}>
                <h1
                  className={`${styles.overViewStatus} showSmooth ${styles.countOverview} al-i-c flex  gap5 ${styles.uploadingTitle}`}
                >
                  <DonutSmallIcon /> {translations?.filesWindow?.overview}{" "}
                  {totalFiles}{" "}
                </h1>
              </div>
            ) : (
              ""
            )}
          </div>
          {files.length ? (
            <div
              className={`${styles.overViewStatus} showSmooth ${styles.countUploaded} al-i-c flex  gap5`}
            >
              <DoneIcon />{" "}
              <h1>
                {translations?.filesWindow?.uploaded} {filesUploaded?.length}
              </h1>
            </div>
          ) : (
            ""
          )}
          {filesFaileded?.length ? (
            <div
              className={`${styles.overViewStatus} showSmooth ${styles.countFaileded} al-i-c flex  gap5`}
            >
              <ErrorOutlineIcon />{" "}
              <h1>
                {translations?.filesWindow?.faild} {filesFaileded?.length}
              </h1>
            </div>
          ) : (
            ""
          )}
        </div>
        <div onClick={openWindow} className={`${styles.boxRight} clickable`}>
          <IosShareIcon />
        </div>
      </div>
    </div>
  );
};

export default Popup;

"use client"
import styles from "./FileDetails.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { deleteOneFile } from "@/_Dashboard/lib/dashboard";
import { formatTimeAgo } from "@/utils/date";
import { customText } from "@/utils/text";
import DisplayMedia from "../DisplayMedia/DisplayMedia";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { useState, useTransition } from "react";
import AsyncButton from "@/components/Shared/AsyncButton/AsyncButton";
import { delay } from "@/utils/time";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useDisableScroll from "@/hooks/useDisableScroll";
import { formatFileSize } from "@/utils/data";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useDynamicState from "@/hooks/useDynamicState";
const FileDetails = ({
  createdAt = "",
  filename = "",
  mimetype = "",
  size = "",
  url = "",
  onClose,
  onRmove = () => {},
  thumbnail = "",
  _id,
  public_id,
  translations,
  canDelete = true,
}) => {
  const { theme } = useTheme();

  const [isPending, startTransition] = useTransition();
  const [{ downloadLoading, removeingLoading }, setState] = useDynamicState({
    downloadLoading: false,
    removeingLoading: false,
  });
   const {
    
  } = useDisableScroll(true);
  const handleDownload = async () => {
    setState({
      downloadLoading: true,
    });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const urlblob = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlblob;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlblob);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setState({
        downloadLoading: false,
      });
    }
  };

  const handleClose = () => {
    startTransition(async () => {
      await delay(300);
      onClose();
    });
  };

  const HandleRemove = async () => {
    setState({
      removeingLoading: true,
    });
    try {
      await deleteOneFile(_id);
      onRmove(_id);
    } catch (error) {
      // error handling
    } finally {
      setState({
        removeingLoading: false,
      });
    }
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`${styles.infoLayout}  flex-c show`}
      />
      <div
        className={`    flex just-sb column al-i-c ${styles.info} ${
          isPending && styles.closeEvent
        } ${theme?.background} ${theme.bord20} flex ${styles.showinfo}`}
      >
        <span onClick={handleClose} className={`flex-c ${styles.btnclose}`}>
          <CloseIcon />
        </span>

        <div className={`${styles.top} p-reltive `}>
          <DisplayMedia
            autoPlay={false}
            AsyncLoading={!url}
            theme={theme}
            className={`${styles.media} ${theme?.bgMedia}`}
            mainClassName={`${styles.mainClassName}`}
            url={url}
            type={mimetype}
            controls={true}
            thumbnail={thumbnail}
          />
        </div>
        <div className={`${styles.bottom} ${theme.bord20}`}>
          <ul>
            <li>
              <h1>{translations?.fileDetails?.name}</h1>
              <p>{customText(filename, 30)}</p>
            </li>
            <li>
              <h1>{translations?.fileDetails?.id}</h1>
              <p>{_id}</p>
            </li>

            <li>
              <h1>{translations?.fileDetails?.date}</h1>
              <p>{formatTimeAgo(createdAt, translations)}</p>
            </li>
            <li>
              <h1>{translations?.fileDetails?.cloudId}</h1>
              <p>{public_id}</p>
            </li>
            <li>
              <h1>{translations?.fileDetails?.size}</h1>
              <p>{formatFileSize(size, translations)}</p>
            </li>

            <li>
              <h1>{translations?.fileDetails?.extension}</h1>
              <p>{mimetype}</p>
            </li>
          </ul>
          <div className="flex just-c  gap20 wrap">
            <AsyncButton
              loading={downloadLoading}
              text={translations?.fileDetails?.download}
              onLoading=""
              spinnerColor={theme?.name !== "light" ? "white" : "black"}
              onClick={handleDownload}
              className={` ${styles.btn} ${theme.button} `}
            />

            <a
              href={url}
              className={`${styles.btn} flex al-i-c  just-c ${theme.button}`}
              target="_blank"
            >
              <span>{translations?.fileDetails?.link}</span>
              <ArrowOutwardIcon className="svg-dir" />
            </a>
            {canDelete && (
              <AsyncButton
                loading={removeingLoading}
                text={translations?.fileDetails?.delete}
                onLoading=""
                spinnerColor={"red"}
                onClick={HandleRemove}
                
                className={` ${styles.btn} ${theme?.danger10}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileDetails;

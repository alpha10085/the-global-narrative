"use client";

import { csrApi } from "@/utils/api";
import axios from "axios";
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import Popup from "../Popup/Popup";
import { useQueryClient } from "@tanstack/react-query";
import Window from "../Window/window";
import { getfileType } from "@/_Dashboard/utils/fileUploadHelper";
import { useAuth } from "@/contexts/AuthProvider";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";

export const FileUploadContext = createContext("FileUploadContext");

const FileUploadCTX = ({ children }) => {
  const { session } = useAuth();
  const [files, setFiles] = useState([]);
  const [toggleSmpopup, setToggleSmpopup] = useState(false);
  const [toggleWindow, setToggleWindow] = useState(false);
  const queryClient = useQueryClient();
  const onSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ["files"],
      refetchType: "all",
    });
  };
  const filesUploaded = files?.filter((file) => file?.uploaded);
  const filesUploading = files?.filter((file) => file?.uploading);
  // Queue of files that are not uploaded yet
  const pendingFiles = files?.filter(
    (file) => !file?.uploaded && !file.error && !file?.uploading
  );
  const queue = files?.filter((file) => !file?.uploaded && !file.error);
  const filesFaileded = files?.filter((f) => f?.error);
  const totalFiles = files?.length;
  const isSuccess = totalFiles === filesUploaded?.length;
  const uploading = !!queue?.length;
  const openWindow = () => {
    setToggleSmpopup(false);
    setToggleWindow(true);
  };

  // Close window
  const closeWindow = () => {
    setToggleWindow(false);
  };
  // Add new files to the queue
  const addFilesToQueue = useCallback((newFiles) => {
    setFiles((prev) => {
      const existingPaths = new Set(prev?.map((f) => f?.file?.path));
      const filteredNewFiles = newFiles
        .filter((file) => !existingPaths.has(file?.file?.path))
        .map((file) => ({
          ...file,
          type: getfileType(file),
          fileName:
            file?.file?.name?.substring(
              0,
              file?.file?.name?.lastIndexOf(".")
            ) || file?.file?.name,
          uploaded: false,
          progress: 0,
          uploading: false,
          error: false,
          controller: new AbortController(),
          abortCallback: () => handleAbort(file?.file?.path),
        }));
      return prev.length === [...prev, ...filteredNewFiles].length
        ? prev
        : [...prev, ...filteredNewFiles];
    });
  }, []);
  // abort handler
  const handleAbort = useCallback((filePath) => {
    setFiles((prevFiles) => {
      return prevFiles?.map((file) => {
        if (file.file.path === filePath && !file.uploaded) {
          file.controller.abort();
          return {
            ...file,
            uploading: false,
            error: {
              message: "canceld",
            }, // Mark as error to indicate cancellation
            progress: 100,
          };
        }
        return file;
      });
    });
  }, []);
  // Upload individual file
  const uploadFile = useCallback(async (file) => {
    setFiles((prev) =>
      prev?.map((val) =>
        val?.file?.path === file?.file?.path ? { ...val, uploading: true } : val
      )
    );
    try {
      // Get Cloudinary pre-signed upload URL and credentials
      const ticket = await csrApi.post("/files/tickets");
      const formData = new FormData();
      formData?.append("file", file?.file);
      formData?.append("signature", ticket?.signature);
      formData?.append("api_key", ticket?.api_key);
      formData?.append("timestamp", ticket?.timestamp);
      // Upload file to Cloudinary with progress update
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${ticket?.cloud_name}/auto/upload`,
        formData,
        {
          signal: file?.controller?.signal,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFiles((prev) =>
              prev?.map((val) =>
                val?.file?.path === file?.file?.path
                  ? {
                      ...val,
                      progress: Math?.min(percentCompleted, 99),
                    }
                  : val
              )
            );
          },
        }
      );
      // After successful upload, register the file on the server
      const thumbnail = file?.type?.includes("video")
        ? `${data?.secure_url?.substring(
            0,
            data?.secure_url?.lastIndexOf(".")
          )}.jpg`
        : undefined;
      const res = await csrApi.post("/files", {
        public_id: data?.public_id,
        url: data?.secure_url,
        size: data?.bytes,
        mimetype: file?.type,
        filename: file?.fileName,
        thumbnail,
      });
      setFiles((prev) =>
        prev?.map((val) =>
          val?.file?.path === file?.file?.path
            ? {
                ...val,
                ...res?.data,
                response: res?.data,
                progress: 100,
                uploaded: true,
                error: false,
                uploading: false,
              }
            : val
        )
      );
    } catch (error) {
      console.log(
        "🚀 ~ uploadFile ~ error:",
        error?.response.data?.error?.message
      );
      let errorMSg =
        error?.response?.data?.error?.message || error?.message || "failed";

      if (errorMSg.includes("file size")) {
        errorMSg = "file is to big";
      }
      setFiles((prev) =>
        prev?.map((val) =>
          val?.file?.path === file?.file?.path
            ? {
                ...val,
                error: {
                  message: errorMSg,
                },
                progress: 100,
                uploaded: false,
                uploading: false,
              }
            : val
        )
      );
    }
  }, []);
  // Start uploading files in batches of 2
  const startUploadFiles = useCallback(() => {
    const uploadingCount = files?.filter((file) => file?.uploading)?.length;
    if (uploadingCount < 2 && pendingFiles?.length > 0) {
      const nextBatch = pendingFiles?.slice(0, 2 - uploadingCount);
      nextBatch?.forEach(uploadFile);
    }
  }, [pendingFiles, uploadFile]);
  // Clear the queue if there are no more files
  const clearQueue = useCallback(() => {
    if (queue?.length === 0) {
      setToggleSmpopup(false);
      setToggleWindow(false);
      setFiles([]);
    }
  }, [queue]);
  // Trigger uploads on new files being added
  useEffect(() => {
    if (pendingFiles?.length > 0) {
      startUploadFiles();
    }
  }, [pendingFiles, startUploadFiles]);

  useEffect(() => {
    if (files?.length && !toggleWindow) {
      setToggleSmpopup(true);
    }
  }, [filesUploading, toggleWindow]);
  useEffect(() => {
    if (
      files?.length &&
      !queue?.length &&
      files?.filter((f1) => f1?.response)?.length &&
      filesUploaded?.length
    )
      onSuccess();
  }, [files, uploading]);
  const contextProps = {
    files,
    addFilesToQueue,
    uploading,
    clearQueue,
    filesUploaded,
    filesUploading,
    filesFaileded,
    totalFiles,
    isSuccess,
    pendingFiles,
    queue,
    openWindow,
    closeWindow,
  };

  const translations = useTranslationsDashboard(
    [],
    [
      "filesWindow.uploading",
      "filesWindow.overview",
      "filesWindow.uploaded",
      "filesWindow.faild",
      "filesWindow.dropZone",
      "filesWindow.done",
      "filesWindow.uploads",
      "filesWindow.dropHere",
      "filesWindow.drop_ph",
    ]
  );

  return (
    <FileUploadContext.Provider value={{ openWindow, toggleWindow }}>
      {children}
      {
        <>
          <Popup
            {...contextProps}
            openWindow={openWindow}
            open={toggleSmpopup}
            translations={translations}
          />
          <Window
            {...contextProps}
            callBack={addFilesToQueue}
            close={closeWindow}
            open={toggleWindow}
            translations={translations}
          />
        </>
      }
    </FileUploadContext.Provider>
  );
};

export const useUploadFile = () => useContext(FileUploadContext);

export default FileUploadCTX;

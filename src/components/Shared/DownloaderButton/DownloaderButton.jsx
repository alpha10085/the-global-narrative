"use client";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { delay } from "@/utils/time";
const DownloaderButton = ({
  url = null,
  fileName = "",
  fileType = "",
  className = "",
  errorClassName = "",
  children,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    if (!url) return setError(true);
    setLoading(true);
    try {
      const response = await axios.get(url, {
        responseType: "blob", // Important for handling binary data
      });
      const mimeType =
        response?.headers["content-type"] || getMimeType(fileType);
      const blob = new Blob([response.data], { type: mimeType });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName; // Use the provided fileName
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Revoke the object URL after the download
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  // Helper function to get MIME type based on file extension
  const getMimeType = (fileType = 'default') => {
    let alltypes = {
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'mp4': 'video/mp4',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'default': 'application/octet-stream'

    }
    return alltypes?.[fileType]
  };

  return (
    <button
      className={`${className} ${error && errorClassName}`}
      onClick={handleDownload}
    >
      {loading ? (
        <Spinner size={20} color="black" />
      ) : error ? (
        "something wrong"
      ) : (
        children
      )}
    </button>
  );
};

export default DownloaderButton;

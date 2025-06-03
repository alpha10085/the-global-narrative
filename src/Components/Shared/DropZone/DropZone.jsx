// src/Components/DropZone.js
import allowedFormates_FN, {
  default_formates,
} from "@/_Dashboard/configuration/file.conf";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DropZone.module.css";
const DropZone = ({
  allowedTypes = default_formates,
  className,
  placeholder,
  callBack,
  translations,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = acceptedFiles?.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    callBack(newPreviews);
  }, [callBack]);

  const accept = useMemo(() => allowedFormates_FN(allowedTypes), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className={`${className} flex-c ${styles.container}`} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{translations?.filesWindow?.dropHere || "dropping..."}</p>
      ) : (
        <p>{placeholder || "drop file here"}</p>
      )}
    </div>
  );
};

export default DropZone;

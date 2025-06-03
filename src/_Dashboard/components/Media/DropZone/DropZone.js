// src/Components/DropZone.js
import allowedFormates from "@/_Dashboard/configuration/file.conf";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ className, placeholder, callBack, allowedTypes = [], translations }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = acceptedFiles?.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    callBack(newPreviews);
  }, []);

  const accept = useMemo(() => allowedFormates(), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className={className} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>{translations?.filesWindow?.dropHere}</p> : <p>{placeholder}</p>}
    </div>
  );
};

export default DropZone;

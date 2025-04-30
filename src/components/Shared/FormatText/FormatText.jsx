"use client";
import { formatText ,customText } from "@/utils/text";
import React, { memo } from "react";
const FormatText = ({ text =null, max = null, className = "" }) => {
  if (!text || typeof text !== "string" ) return null 
  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{
        __html: max ? customText(formatText(text), max) : formatText(text),
      }} // Use dangerouslySetInnerHTML
    />
  );
};

export default memo(FormatText, (prev, next) => {
  return (
    prev?.max === next?.max &&
    prev?.text === next?.text &&
    prev?.className === next?.className
  );
});

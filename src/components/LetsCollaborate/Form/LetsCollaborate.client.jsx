"use client";
import XIcon from "@mui/icons-material/X";
import Send from "@mui/icons-material/Send";
import LinkedIn from "@mui/icons-material/LinkedIn";
import DoneIcon from '@mui/icons-material/Done';

import React, { useState } from "react";
import toast from "react-hot-toast";
export const TwitterIcon = ({ className }) => (
  <div className={className}>
    <XIcon />
  </div>
);

export const LinkedInIcon = ({ className }) => (
  <div className={className}>
    <LinkedIn />
  </div>
);

export const SendIcon = ({ className }) => (
  <div className={className}>
    <Send />
  </div>
);


export const EmailShareButton = ({ email }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("email copied to clipboard", {
        position: "top-center"
      })
    } catch (err) {
      toast.error("Failed to copy email");
    }

    // Clear the message after a delay
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={handleCopyToClipboard}
        style={{
          background: "transparent",
          border: "none",
        }}
      >
        <Send />
      </button>
    </div>
  );
};




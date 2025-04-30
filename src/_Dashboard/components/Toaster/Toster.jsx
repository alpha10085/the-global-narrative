"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
const ToasterComponent = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  let configStyles = {
    color: theme?.name === "dark" ? "#fff" : "#000000",
    background: theme?.name === "dark" ? "#080808" : "#f0f0f0",
    border: theme?.name === "dark" ? "1px solid #252525" : "1px solid #d2d2d2",
  };
  let iconTheme = {
    primary: "#33de07",
    secondary: "#000",
  };
  let options = pathname?.includes("dashboard")
    ? {
        className: "",
        style: configStyles,
        success: {
          iconTheme,
        },
        error: {
          iconTheme: {
            primary: "#9d0a0a",
            secondary: "#000",
          },
        },
      }
    : {};
  return <Toaster toastOptions={options} />;
};

export default ToasterComponent;

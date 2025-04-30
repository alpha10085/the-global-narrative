"use client";
import LoadingLayout from "@/components/Shared/LoadingLayout/LoadingLayout";
import React, { useEffect } from "react";
const Loading = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, []);
  return (
    <LoadingLayout
      style={{
        height: "100vh",
      }}
    />
  );
};

export default Loading;

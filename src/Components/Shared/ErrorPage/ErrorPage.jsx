"use client";
import { decodestringtoObject } from "@/utils/data";
import { csrApi } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./ErrorPage.module.css";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
export const DefualtScreen = () => {
  return (
    <div className={`${styles.container} flex-c column`}>
      <div className={styles.icon}>
        <RunningWithErrorsIcon />
      </div>
      <h1 className={styles.title}>something went wrong !</h1>
    </div>
  );
};

const ErrorPage = ({ error, reset = () => {}, Component = DefualtScreen }) => {
  const errorMSg = decodestringtoObject(error?.message);
  

  // Trigger error boundary if the condition is met
  useEffect(() => {
    sendErrorToServer(error);
  }, [errorMSg]);

  // // If the error boundary is triggered, avoid rendering
  // if (errorMSg?.errorBoundary) {
  //   return null;
  // }

  return <Component error={error} reset={reset} />;
};

export const sendErrorToServer = async (err) => {
  try {
    if (process.env.NEXT_PUBLIC_MODE === "dev") return;
    const res = await csrApi.post("/error-logs", {
      message: err?.message,
      stack: err?.stack?.slice(0, 2000),
    });
  } catch (error) {
    console.log("🚀 ~ sendErrorToServer ~ error:", error);
  }
};

export default ErrorPage;

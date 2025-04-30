import { useErrorBoundary } from "@/contexts/ErrorBoundryCTX";
import { decodestringtoObject } from "@/utils/data";
import { csrApi } from "@/utils/api";
import { useEffect, useState } from "react";

const ErrorPage = ({
  error,
  reset = () => {},
  Component = () => <div >something wrong</div>,
}) => {
  const { showBoundary } = useErrorBoundary();
  const errorMSg = decodestringtoObject(error?.message);

  // Trigger error boundary if the condition is met
  useEffect(() => {
    if (errorMSg?.errorBoundary) {
      showBoundary();
    } else {
      sendErrorToServer(errorMSg);
    }
  }, [errorMSg, showBoundary]);

  // If the error boundary is triggered, avoid rendering
  if (errorMSg?.errorBoundary) {
    return null;
  }

  return <Component error={error} reset={reset} />;
};

export const sendErrorToServer = async (err) => {
  try {
    if (process.env.NEXT_PUBLIC_MODE === "dev") return;
    const res = await csrApi.post("/error-logs", {
      message: err?.message,
      stack: err?.stack?.slice(0, 2000),
    });
  } catch (error) {}
};

export default ErrorPage;

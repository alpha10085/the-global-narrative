"use client";
import ErrorBoundaryPage from "@/components/Shared/ErrorBoundary/ErrorBoundary";
import useDynamicState from "@/hooks/useDynamicState";
import { checkApi } from "@/lib/CheckApi";
import CookiesClient from "js-cookie";

import React, { createContext, useContext, useEffect, useState } from "react";

const ErrorBoundaryContext = createContext("ErrorBoundaryContext");
export const ErrorBoundary = ({ children, boundary }) => {
  const [{ error, isLoading }, setState] = useDynamicState({
    isLoading: true,
    error: boundary,
  });
  const showBoundary = () => {
    CookiesClient.set("boundary", "true", { expires: 10 });
    setState({
      error: true,
      isLoading: false,
    });
  };
  const hideBoundary = () => {
    CookiesClient.remove("boundary");
    setState({
      error: false,
      isLoading: false,
    });
  };

  const handleCheckServer = async () => {
    setState({
      isLoading: true,
    });
    const isLive = await checkApi();
    if (isLive) return hideBoundary();
    showBoundary();
  };
  useEffect(() => {
    if (boundary) handleCheckServer();
  }, [boundary]);

  return (
    <ErrorBoundaryContext.Provider value={{ showBoundary, hideBoundary }}>
      {error ? <ErrorBoundaryPage isLoading={isLoading} /> : children}
    </ErrorBoundaryContext.Provider>
  );
};
export const useErrorBoundary = () => useContext(ErrorBoundaryContext);

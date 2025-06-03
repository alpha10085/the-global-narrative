"use client";
import ErrorBoundaryPage from "@/_components/Shared/ErrorBoundary/ErrorBoundary";
import useDynamicState from "@/hooks/useDynamicState";
import { checkApi } from "@/lib/CheckApi";
import CookiesClient from "js-cookie";

import React, { createContext, useContext, useEffect, useState } from "react";
import OfflineBanner from "./OfflineBanner/OfflineBanner";
import eventBus from "@/utils/eventBus";

export const ErrorBoundary = ({ children, boundary }) => {
  const [{ error, isOffline, isLoading }, setState] = useDynamicState({
    isLoading: true,
    error: boundary,
    isOffline: false,
  });
  const showBoundary = () => {
    if (isOffline) return null;
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

  const showOfflineBanner = () => {
    setState({
      isOffline: true,
    });
  };

  useEffect(() => {
    eventBus.on("offline-mode", showOfflineBanner);
    eventBus.on("server-down", showBoundary);
  }, []);
  useEffect(() => {
    if (boundary) handleCheckServer();
  }, [boundary , isOffline]);

  useEffect(() => {
    const updateStatus = () =>
      setState({
        isOffline: !navigator.onLine,
      });

    updateStatus(); // Set initial state after hydration

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <OfflineBanner enabled={isOffline}>
      {error ? <ErrorBoundaryPage isLoading={isLoading} /> : children}
    </OfflineBanner>
  );
};

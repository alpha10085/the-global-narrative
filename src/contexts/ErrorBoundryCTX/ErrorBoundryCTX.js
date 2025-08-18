"use client";
import ErrorBoundaryPage from "@/components/Shared/ErrorBoundary/ErrorBoundary";
import useDynamicState from "@/hooks/useDynamicState";
import { checkApi } from "@/lib/CheckApi";
import CookiesClient from "js-cookie";

import React, { useEffect } from "react";
import OfflineBanner from "./OfflineBanner/OfflineBanner";
import eventBus from "@/utils/eventBus";
import { isProductionMode } from "@/config/main";

export const ErrorBoundary = ({ children, boundary }) => {
  const [{ error, isOffline, isLoading }, setState] = useDynamicState({
    isLoading: true,
    error: boundary,
    isOffline: false,
  });

  async function checkSpeed() {
    const start = Date.now();
    try {
      const res = await fetch("/api", { cache: "no-store" });

      if (!res.ok) {
        // backend reachable but not healthy
        return { connection: "fast", error: true };
      }

      const duration = Date.now() - start;
      return {
        connection: duration > 2000 ? "slow" : "fast",
        error: false,
      };
    } catch {
      // network error or server fully down
      return { connection: "none", error: true };
    }
  }

  const showBoundary = async () => {
    if (isOffline) return;

    const { error } = await checkSpeed();
    if (error) {
      CookiesClient.set("boundary", "true", { expires: 10 });
      setState({ error: true, isLoading: false });
    }
    return showOfflineBanner()
  };

  const hideBoundary = () => {
    CookiesClient.remove("boundary");
    setState({ error: false, isLoading: false });
  };

  const handleCheckServer = async () => {
    setState({ isLoading: true });
    const isLive = await checkApi();
    if (isLive) {
      hideBoundary();
      return true;
    }
    showBoundary();
    return false
  };

  const showOfflineBanner = () => {
    if (!isProductionMode) return;
    setState({ isOffline: true });
  };

  // Event bus listeners
  useEffect(() => {
    eventBus.on("offline-mode", showOfflineBanner);
    eventBus.on("server-down", showBoundary);
  }, []);

  // Re-check server when boundary or offline changes
  useEffect(() => {
    if (boundary) handleCheckServer();
  }, [boundary, isOffline]);

  // Listen to online/offline events
  useEffect(() => {
    const updateStatus = () => {
      if (!isProductionMode) return;
      setState({ isOffline: !navigator.onLine });
    };
    updateStatus();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <OfflineBanner enabled={isOffline}>
      {error ? (
        <ErrorBoundaryPage
          handleCheckServer={handleCheckServer}
          isLoading={isLoading}
        />
      ) : (
        children
      )}
    </OfflineBanner>
  );
};

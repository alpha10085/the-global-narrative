'use client';

import { useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_EXPIRE_DAYS = 1; 

const getCookieSessionKey = (pathname) => `insight_${encodeURIComponent(pathname)}`;

const PageAnalyticsTracker = () => {
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safety

    const pathname = window.location.pathname;
    const cookieKey = getCookieSessionKey(pathname);

    // Only send if not tracked before in this cookie session
    if (Cookies.get(cookieKey)) return;

    // Send analytics to backend
    fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pathname }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send analytics");
        Cookies.set(cookieKey, "1", { expires: COOKIE_EXPIRE_DAYS });
        return res.json();
      })
      .then((data) => {
        console.log("✅ Analytics sent:", data);
      })
      .catch((err) => {
        console.error("❌ Analytics error:", err.message);
      });
  }, []);

  return null; // No UI output, just logic
};

export default PageAnalyticsTracker;

"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { csrApi } from "@/utils/api";
import { usePathname } from "next/navigation";
import { systemLogger } from "@/utils/consoleProxy";

const COOKIE_EXPIRE_DAYS = 1;

const getCookieSessionKey = (pathname) =>
  `analytics_${encodeURIComponent(pathname)}`;

const sendPageAnalytics = async (pathname) => {
  try {
    const cookieKey = getCookieSessionKey(pathname);
    if (Cookies.get(cookieKey)) return;

    await csrApi.post("/analytics", { pathname });
    Cookies.set(cookieKey, "1", { expires: COOKIE_EXPIRE_DAYS });
  } catch (error) {
    // need report
  }
};

const PageAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      sendPageAnalytics(pathname);
    }
  }, [pathname]);

  return null;
};

export default PageAnalytics;

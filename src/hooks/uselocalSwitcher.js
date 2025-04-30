"use client";

import config, { getlanguagesMap } from "@/i18n/config";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useEffect, useMemo } from "react";

const useLocaleSwitcher = (defaultLocale = "en") => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const languagesMap = getlanguagesMap();
  // Current locale state
  const [locale, setlocale] = useState(
    config.route ? pathname?.split("/")?.[1] || defaultLocale : ""
  );

  useEffect(() => {
    const localeCookies = Cookies.get("locale");
    setlocale(
      (config.route ? pathname?.split("/")?.[1] : localeCookies) ||
        defaultLocale
    );
  }, []);

  // Handle locale change
  const changeLocale = (nextLocale, replace = true) => {
    if (nextLocale === locale) return;
    // Update current locale
    Cookies.set("locale", nextLocale, {
      expires: 365,
      path: "/",
    });
    setlocale(nextLocale);
    if (config.route) {
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
      // Navigate to the new locale path
      router.replace(replace ? newPathname : `/${nextLocale}`);
      document.documentElement.lang = nextLocale;
      document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
    } else {
      router.refresh();
    }
  };
  const props = useMemo(() => {
    return {
      key: locale,
      label: languagesMap?.find((l) => l.key === locale)?.label,
    };
  }, [locale]);

  return {
    locale: props,
    isPending,
    changeLocale,
    options: languagesMap,
  };
};

export default useLocaleSwitcher;

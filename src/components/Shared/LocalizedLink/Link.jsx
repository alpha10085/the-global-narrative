"use client";

import { useLocale } from "next-intl";
import { getLocalizedPath } from "@/utils/locale";
import config from "@/i18n/config";
import { useMemo } from "react";
import NextLink from "next/link";

const Link = ({ href, children, className, ...props }) => {
  const locale = useLocale() || config.defaultLocale;

  const localizedHref = config.route
    ? useMemo(() => getLocalizedPath(href, locale), [href, locale])
    : href;

  return (
    <NextLink
      onClick={(e) => {
        if (
          typeof window !== "undefined" &&
          window.location.pathname === localizedHref
        ) {
          e.preventDefault();
        }
      }}
      href={localizedHref}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;

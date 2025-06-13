import useLocaleSwitcher from "@/hooks/uselocalSwitcher";
import config from "@/i18n/config";
import { getLocalizedPath } from "@/utils/locale";
import { useMemo } from "react";

export const useHandleherfLink = (href = "/") => {
  const locale = useLocaleSwitcher() || config.defaultLocale;

  const localizedHref = useMemo(() => {
    return config.route ? getLocalizedPath(href, locale) : href;
  }, [href, locale]);

  const onClick = (fn) => (e) => {
    if (window.location.pathname === localizedHref) {
      e.preventDefault();
      return;
    }
    fn();
  };

  return {
    href: localizedHref,
    onClick,
  };
};

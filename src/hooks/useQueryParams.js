"use client";
import { scrollToElement } from "@/utils/document";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryParams = ({ scrollTo = null, offset = 0 } = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formatVal = (val) => val?.toString()?.trim();

  const multiple = useCallback(
    (name, value, scroll = false) => {
      if (!name) return;
      value = formatVal(value);
      if (!value) return;

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      let query =
        searchParams
          .get(name)
          ?.split(",")
          .map((v) => v.trim()) || [];

      if (query.includes(value)) {
        query = query.filter((i) => i !== value);
      } else {
        query.push(value);
      }

      if (query.length) {
        current.set(name, query.join(","));
      } else {
        current.delete(name);
      }

      router.push(`${pathname}?${current.toString()}`, {
        scroll: false,
        shallow: true,
      });
      if (scroll && scrollTo) {
        scrollToElement(scrollTo, offset);
      }
    },
    [router, pathname, searchParams]
  );

  const singleValue = useCallback(
    (name, value, scroll = false) => {
      if (!name) return;

      const formatted = formatVal(value);
      const currentValue = searchParams?.get(name);
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Nothing changed
      if (formatted === currentValue) return;

      if (formatted) {
        current.set(name, formatted);
      } else {
        current.delete(name);
      }

      router.push(
        `${pathname}?${current.toString()}`,
        { scroll:false },
        { shallow: true }
      );
      if (scroll && scrollTo) {
        scrollToElement(scrollTo, offset);
      }
    },
    [router, pathname, searchParams]
  );

  const clearOne = useCallback(
    (name) => {
      if (!name) return;
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete(name);
      router.push(`${pathname}?${current.toString()}`, { shallow: true });
      if (scrollTo) {
        scrollToElement(scrollTo, offset);
      }
    },
    [router, pathname, searchParams]
  );

  const clearQuery = useCallback(() => {
    router.push(pathname, { shallow: true });
    if (scrollTo) {
      scrollToElement(scrollTo, offset);
    }
  }, [router, pathname]);

  const allParamsObject = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  return {
    multiple,
    singleValue,
    clearOne,
    clearQuery,
    searchParams: allParamsObject,
  };
};

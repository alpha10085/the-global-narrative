"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams?.entries()));
  const formatVal = (val) => val?.toString()?.trim();
  const multiple = useCallback(
    (name, value, scroll = false) => {
      try {
        value = formatVal(value);
        if (!value || !name) return;
        let query = searchParams.get(name) || "";
        query = query.split(",").filter((i) => i);
        if (query.includes(value)) {
          query = query?.filter((i) => i !== value);
        } else {
          query = [...query, value];
        }
        if (current.has(name)) {
          if (!query.length) {
            current.delete(name);
          } else {
            current.set(name, query.join(","));
          }
        } else {
          current.append(name, query.join(","));
        }
        router.push(
          `${pathname}?${current.toString()}`,
          { scroll },
          {
            shallow: true,
          }
        );
      } catch (error) {}
    },
    [searchParams, current, router, pathname]
  );

  const singleValue = useCallback(
    (name, value, scroll = false) => {
      if (!name) return;
      value = formatVal(value);
      try {
        if (value) {
          if (current.has(name)) {
            if (searchParams?.get(name) !== value) {
              current.set(name, value);
            } else {
              current.delete(name);
            }
          } else {
            current.append(name, value);
          }
        } else {
          current.delete(name);
        }
        router.push(
          `${pathname}?${current.toString()}`,
          { scroll },
          {
            shallow: true,
          }
        );
      } catch (error) {}
    },
    [router, pathname, current, searchParams]
  );

  const clearOne = useCallback(
    (name) => {
      try {
        if (!name) return;
        current.delete(name);
        router.push(`${pathname}?${current.toString()}`, undefined, {
          shallow: true,
        });
      } catch (error) {}
    },
    [current, router, pathname]
  );

  const clearQuery = useCallback(() => {
    router.push(pathname, undefined, { shallow: true });
  }, [pathname, router]);

  const allParamsObject = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  return {
    multiple,
    clearQuery,
    singleValue,
    clearOne,
    searchParams: allParamsObject,
  };
};

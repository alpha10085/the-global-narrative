"use client";

import { timeToMillis } from "@/utils/time";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export const useInfinityQuery = ({
  Key,
  next,
  onError = (error) => {},
  refetchOnWindowFocus = false,
  retry = false,
  enabled = true,
  cache = "0s",
}) => {
  const cacheTime = useMemo(() => timeToMillis(cache), [cache]);

  const {
    data = { pages: ([] = []), metadata: ({} = {}) },
    isLoading,
    isFetching,
    isPending,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: Key, // Ensure this Key is consistent and unique
    queryFn: next,
    getNextPageParam: (res) => {
      const page = res?.metadata?.page;
      const pageCount = res?.metadata?.pages;
      return page < pageCount ? page + 1 : undefined;
    },
    select: (data) => {
      const mergedData = data?.pages
        .flatMap((page) => page?.data || [])
        .filter(Boolean);
      return { pages: mergedData, metadata: data?.pages?.[0]?.metadata };
    },
    refetchOnWindowFocus,
    staleTime: cacheTime,
    cacheTime,
    retry,
    enabled: !!enabled,
  });

  const handleError = () => {
    const { errorBoundary = false, logout = false } = error;
    if (!errorBoundary) {
      onError(error);
    }
  };

  useEffect(() => {
    if (error && !isFetching) handleError();
  }, [error, isFetching]);

  return {
    data, // merged all pages data
    isLoading: isFetching || isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
  };
};

export const cacheUpdateor = (oldData, _id) => {
  let newData = oldData?.pages?.map((page) => {
    return {
      metadata: {
        ...page.metadata,
        total: page?.metadata?.total - 1,
      },
      data: page?.data?.filter((item) => item?._id !== _id),
    };
  });
  return {
    pages: newData,
    pageParams: oldData?.pageParams,
  };
};
export const addEntriesToCache = (oldData, newEntries) => {
  const updatedData = {
    ...oldData,
    pages: oldData?.pages?.map((page, index) =>
      index === 0 // Add to the first page of data
        ? {
            ...page,
            data: [...newEntries, ...(page?.data || [])],
            metadata: {
              ...page.metadata,
              total: (page?.metadata?.total || 0) + newEntries?.length,
            },
          }
        : page
    ),
  };
  return updatedData;
};

export default useInfinityQuery;

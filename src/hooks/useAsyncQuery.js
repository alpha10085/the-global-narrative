/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { timeToMillis } from "@/utils/time";

const useAsyncQuery = ({
  queryKey = [],
  queryFn = () => {},
  onError = (e) => {},
  refetchOnWindowFocus = false,
  retry = false,
  enabled = true,
  cache = "1s",
}) => {
  const cacheTime = useMemo(() => timeToMillis(cache), [cache]);

  const { data, error, isFetching, isPending, isLoading, refetch } = useQuery({
    queryKey,
    queryFn,
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
  const loading = isFetching || isLoading;
  return {
    data: loading ? undefined : data,
    error,
    isLoading: loading,
    refetch,
  };
};

export default useAsyncQuery;

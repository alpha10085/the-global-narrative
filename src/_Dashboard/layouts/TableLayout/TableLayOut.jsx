"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import style from "./TableLayOut.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import FilterSystem from "../../components/FilterSystem/FilterSystem";
import AddIcon from "@mui/icons-material/Add";
import Link from "@/components/shared/LocalizedLink/Link";
import { useQueryParams } from "@/hooks/useQueryParams";
import useInfinityQuery from "@/hooks/useInfinityQuery";
import Table from "@/_Dashboard/components/boxs/Table/Table";
import { isEqual } from "lodash";
import { notFound } from "next/navigation";
import Skeleton from "@/components/shared/Skeleton/skeleton";
import { tableAPI } from "@/_Dashboard/lib/dashboard";
import { getLabelsByKeys } from "@/_Dashboard/components/boxs/Table/helpers";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";
import { getlabelFiltersCondtions } from "@/_Dashboard/components/FilterSystem/helper";

const TableLayOut = ({
  slug,
  endPoint = null,
  path = "collections",
  customFilters = {},
  displayName = "",
  schema,
}) => {
  const fields = schema?.fields;
  if (!fields || !schema?.options?.roles?.table) return notFound();
  const { theme } = useTheme();
  const { searchParams } = useQueryParams();
  const [countLoading, setCountLoading] = useState(true);
  const [removedItems, setRemovedItems] = useState([]);
  const {
    data = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfinityQuery({
    Key: [endPoint || slug, searchParams, customFilters],
    next: tableAPI,
    cache: schema?.options?.cache?.duration,
  });
  useEffect(() => {
    setCountLoading(true);
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading) setCountLoading(false);
    setRemovedItems([]);
  }, [isLoading, searchParams]);
  const keys = useMemo(() => getLabelsByKeys(schema), [slug]); // Get all keys in testData + for handle if data?.length is undefined or empty
  const translations = useTranslationsDashboard(
    [],
    [
      "create",
      "total",
      "noResult",
      "update",
      "delete",
      `displaynames.${displayName}`,
      "yes",
      "no",
      "inputs.lastUpdatedAt",
      "inputs.id",
      "inputs.createdAt",
      "deleting",
      "cancel",
      "PopupDelte.title",
      "PopupDelte.firstLine",
      "PopupDelte.secLine",
      "year",
      "years",
      "month",
      "months",
      "day",
      "days",
      "hour",
      "hours",
      "minute",
      "minutes",
      "second",
      "seconds",
      "ago",
      "in",
      ...getlabelFiltersCondtions("filterSystem.condtions"),
      ...keys.map((key) => `inputs.${key?.label}`),
    ]
  );

  const tableProps = {
    theme,
    data: Array.isArray(data?.pages) ? data?.pages : [],
    keys,
    slug,
    fields,
    isLoading,
    next: fetchNextPage,
    hasNextPage,
    schema,
    translations,
    path,
    endPoint: endPoint || slug,
    removedItems,
    setRemovedItems,
  };
  if (error) return notFound();
  return (
    <section className={`${style.tablePage} showSmooth`}>
      <div
        className={`${style.head}   ml5 mb20 gap10  flex just-sb al-i-c wrap  `}
      >
        <div className={`${style.text} showSmooth  `}>
          <h1>{translations?.displaynames?.[displayName]}</h1>
        </div>
        <div className={`${style.boxbuttons} flex  gap10 wrap`}>
          {/* <GenrateTestData
            validation={validation} slug={key}
          /> */}
          {schema?.options?.roles?.create && (
            <Link
              href={`/dashboard/${path}/${slug}/create`}
              className={`${style.btncreate} ${theme.button} flex-c al-i-c `}
            >
              {translations?.create}
              <AddIcon />
            </Link>
          )}
        </div>
      </div>
      {countLoading ? (
        <div className={`showSmooth`}>
          <Skeleton theme={theme?.name} className={`${style.Skeleton} `} />{" "}
        </div>
      ) : (
        <h1 className={`${theme.color} showSmooth  ${style.metaCount}`}>
          {" "}
          {translations?.total}{" "}
          {Math.max(
            0,
            (data?.metadata?.total || 0) - (removedItems?.length || 0)
          )}
        </h1>
      )}
      <FilterSystem
        withSearch={schema?.options?.roles?.search}
        withFilters={schema?.options?.roles?.filter}
        slug={slug}
        keys={keys}
        theme={theme}
        translations={translations}
      />
      <Table {...tableProps} translations={translations} />
    </section>
  );
};

export default memo(TableLayOut, (p, n) => {
  return isEqual(p.slug, n.slug);
});

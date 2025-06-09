"use client";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import styles from "./Media.module.css";
import List from "@/_Dashboard/components/Media/List/list";
import AddNewButton from "@/_Dashboard/components/Media/UploadFile/AddNewButton/AddNewButton";
import SearchInput from "@/_Dashboard/components/Inputs/searchInput/searchInput";
import { memo } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";

const Media = ({ roles = {} }) => {
  const { theme } = useTheme();
  const { searchParams, singleValue, clearOne } = useQueryParams();
  const search = searchParams["search"] || "";
  const translations = useTranslationsDashboard(
    [],
    [
      "media.search",
      "media.mediaLibrary",
      "media.searchByName",
      "media.addNewAssets",
      "fileDetails.name",
      "fileDetails.id",
      "fileDetails.date",
      "fileDetails.cloudId",
      "fileDetails.size",
      "fileDetails.extension",
      "fileDetails.download",
      "fileDetails.link",
      "fileDetails.delete",
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
      "deleteSelected",
      "reset",
    ]
  );

  return (
    <section className={` m-auto showSmooth  ${styles.section}`}>
      <h1>{translations?.media?.mediaLibrary}</h1>
      <div className={`${styles.head} flex gap10 just-sb al-i-c `}>
        <SearchInput
          currentVal={search}
          onChange={singleValue}
          onClear={clearOne}
          searchKey="search"
          placeholder={translations?.media?.searchByName}
          className={styles.seacrBar}
          theme={theme}
        />
        {roles.create && (
          <div className={`${styles.right}`}>
            <AddNewButton
              theme={theme}
              addNew={translations?.media?.addNewAssets}
            />
          </div>
        )}
      </div>
      <List
        roles={roles}
        searchParams={searchParams}
        translations={translations}
      />
    </section>
  );
};

export default memo(Media, () => true);

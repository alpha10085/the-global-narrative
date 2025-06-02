import React, { memo, useCallback, useMemo, useState } from "react";
import useInfinityQuery from "@/hooks/useInfinityQuery";

import styles from "./List.module.css";
import { getFiles } from "@/_Dashboard/lib/dashboard";
import { VirtuosoGrid } from "react-virtuoso";
import Spinner from "@/components/Shared/Spinner/Spinner";
import Card from "../Card/Card";
import SearchInput from "@/_Dashboard/components/Inputs/searchInput/searchInput";

const List = ({
  theme,
  current,
  single,
  allowedTypes = [],
  onSelect,
  translations,
}) => {
  const [selectedItems, setSelectedItems] = useState([...current]);
  const [search, setSearch] = useState("");

  const {
    data = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfinityQuery({
    Key: ["files", allowedTypes, search ? { search } : {}],
    next: getFiles,
    cache: "10m",
  });

  const handleSelect = useCallback(
    (item) => {
      onSelect(item);
      setSelectedItems((prev) =>
        prev.find((v) => v?._id === item?._id)
          ? prev.filter((l) => l?._id !== item?._id)
          : single
          ? [item]
          : [...prev, item]
      );
    },
    [onSelect, single]
  );

  const selectedIds = useMemo(
    () => selectedItems?.map((item) => item?._id) || [],
    [selectedItems]
  );

  const Footer = useCallback(
    () =>
      isLoading && (
        <div className={`flex-c ${styles.loadingSpinner}`}>
          <Spinner size={27} theme={theme?.name} />
        </div>
      ),
    [isLoading, theme]
  );

  return (
    <>
      <SearchInput
        currentVal={search}
        onChange={(_, val) => setSearch(val)}
        onClear={() => setSearch("")}
        searchKey="search"
        placeholder={translations?.slider?.search}
        className={styles.searchBar}
        theme={theme}
      />
      <section className={styles.list}>
        <VirtuosoGrid
          className={theme?.scrollBar}
          components={{ Footer }}
          data={data?.pages}
          endReached={() => hasNextPage && fetchNextPage()}
          overscan={200}
          listClassName={styles.gridList}
          itemClassName={styles.gridItem}
          itemContent={(index, item) => (
            <Card
              onClick={() => handleSelect(item)}
              key={item?._id}
              item={item}
              index={index}
              theme={theme}
              active={selectedIds?.includes(item?._id)}
            />
          )}
        />
      </section>
    </>
  );
};

export default memo(List, () => true);

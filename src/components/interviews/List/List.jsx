"use client";
import React, { useCallback, useState } from "react";
import styles from "./List.module.css";
import Card from "../Card/Card";
import { VirtuosoGrid } from "react-virtuoso";
import Skeleton from "@/components/Shared/Skeleton/Skeleton";
import { useQueryParams } from "@/hooks/useQueryParams";
import SearchIcon from "@mui/icons-material/Search";
import lodash from "lodash";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { getInterviewsData } from "@/lib/interviews";
import useInfinityQuery from "@/hooks/useInfinityQuery";
const List = ({ page = {}, categories = [] }) => {
  const { title = "" } = page;
  const { clearOne, clearQuery, multiple, searchParams, singleValue } =
    useQueryParams({
      scrollTo: "#interviews-Categories",
      offset: 100,
    });

  const [isfiltersOpen, setisfiltersOpen] = useState(false);
  const toggleFiltersWindow = (value) => setisfiltersOpen(!isfiltersOpen);
  const closeFiltersWindow = (value) => setisfiltersOpen(false);

  const {
    data = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfinityQuery({
    Key: ["interviews", { ...searchParams }],
    next: getInterviewsData,
  });

  const categoriesQuery = searchParams?.categories?.split(",") || [];

  const searchQuery = (searchParams?.search || "").toLocaleLowerCase();

  let dataAfterFiltered = data.pages;
  if (searchQuery?.length) {
    dataAfterFiltered = dataAfterFiltered.filter((val) =>
      val?.title?.toLocaleLowerCase().includes(searchQuery)
    );
  }

  const debouncedFetch = useCallback(
    lodash?.debounce((value) => {
      singleValue("search", value, {
        removeIfExists: false,
      });
    }, 600),
    [singleValue]
  );

  return (
    <div id="interviews-Categories" className={styles.interviewsContainer}>
      <div className={`${styles.headerContainer} flex column gap20 just-sb`}>
        <div className={`${styles.filters} flex  gap20 just-sb`}>
          <div className={styles.categories}>
            <span
              onClick={() => clearOne("categories")}
              key={"all-main"}
              className={`${styles.categoryItem} ${
                categoriesQuery.length ? "" : styles.active
              }`}
            >
              {"all"}
            </span>
            {categories?.map((category, idx) => (
              <span
                onClick={() => singleValue("categories", category?.slug, true)}
                key={category?._id}
                style={{ animationDelay: `${idx * 200 + 500}ms` }}
                className={`${styles.categoryItem} ${
                  categoriesQuery?.includes(category?.slug)
                    ? styles.active
                    : null
                }`}
              >
                {category?.title}
              </span>
            ))}
          </div>
          <Aos
            delay={1000}
            activeClassName={styles.active}
            className={`${styles.search} flex-c gap5`}
          >
            <SearchIcon />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              defaultValue={searchQuery}
              onChange={(e) => debouncedFetch(e.target.value)}
            />
          </Aos>
        </div>
      </div>
      <Aos
        delay={1500}
        activeClassName={styles.active}
        className={styles.listWapper}
      >
        <VirtuosoGrid
          useWindowScroll
          className={`${styles.list} `}
          data={dataAfterFiltered}
          endReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          overscan={300}
          itemContent={(index, item) => (
            <Aos
              className={styles.fadeInUp}
              activeClassName={styles.active}
              delay={index * 50}
              key={item?._id}
            >
              <Card val={item} index={index} />
            </Aos>
          )}
          listClassName={styles.gridList}
          itemClassName={styles.gridItem}
        />
        {!isLoading && !data?.pages?.length && (
          <div className={`${styles.emptydata} ShowSmoothEffect flex-c`}>
            No interviews found
          </div>
        )}
        {isLoading && (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className={styles.skeletonCard} />
            ))}
          </div>
        )}
      </Aos>
    </div>
  );
};

export default List;

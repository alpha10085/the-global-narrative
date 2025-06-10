"use client";
import React, { useCallback, useState } from "react";
import styles from "./List.module.css";
import Card from "../Card/Card";
import { VirtuosoGrid } from "react-virtuoso";
import Skeleton from "@/componentss/Shared/Skeleton/Skeleton";
import { useQueryParams } from "@/hooks/useQueryParams";
import SearchIcon from "@mui/icons-material/Search";
import lodash from "lodash";
import { scrollToElement } from "@/utils/document";
import Aos from "@/componentss/Shared/Animtions/Aos/Aos";
import useInfinityQuery from "@/hooks/useInfinityQuery";
import { getInterviewsData } from "@/lib/interviews";

const List = ({ }) => {

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

  const scrollToMainSection = () =>
    scrollToElement("#interviews-Categories", 100);
  const debouncedFetch = useCallback(
    lodash?.debounce((value) => {
      scrollToMainSection();
      singleValue("search", value, {
        removeIfExists: false,
      });
    }, 600),
    [singleValue]
  );

  return (
    <div 
    
    // id="interviews-Categories" 
     className={styles.mediaCenterContainer}>
      {/* <div className={`${styles.headerContainer} flex column gap20 just-sb`}>
        <SectionTitle title={title} className={styles.headingTitle} />
        <div className={`${styles.filters} flex al-i-c  gap20 just-sb`}>
          <div className={`${styles.categories} flex gap30`}>
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
                onClick={() => multiple("categories", category?.slug, true)}
                key={category?._id}
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
          <div className={`${styles.search} flex-c gap5`}>
            <SearchIcon />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              defaultValue={searchQuery}
              onChange={(e) => debouncedFetch(e.target.value)}
            />
          </div>
        </div>
      </div> */}
      <VirtuosoGrid
        useWindowScroll
        className={`${styles.list} `}
        data={data?.pages}
        endReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        overscan={300}
        itemContent={(index, item) => (
          <Aos
            className={styles.fadeInUp}
            activeClassName={styles.active}
            delay={index * 50}
          >
            <Card key={item?._id} val={item} />
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
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className={styles.skeletonCard} />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;

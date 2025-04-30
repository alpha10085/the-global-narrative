"use client";
import React, { useCallback } from "react";
import styles from "./List.module.css";
import Card from "../Card/Card";
import { VirtuosoGrid } from "react-virtuoso";
import Skeleton from "@/components/shared/Skeleton/skeleton";
import { useQueryParams } from "@/hooks/useQueryParams";
import SearchIcon from "@mui/icons-material/Search";
import lodash from "lodash";
import { scrollToElement } from "@/utils/document";
import { getFakeNews } from "@/app/(routes)/news/data.test";
const List = ({ page = {}, categories = [] }) => {
  const { title = "" } = page;
  const { clearOne, clearQuery, multiple, searchParams, singleValue } =
    useQueryParams({
      scrollTo: "#news-Categories",
      offset: 100,
    });

  // const [isfiltersOpen, setisfiltersOpen] = useState(false);
  // const toggleFiltersWindow = (value) => setisfiltersOpen(!isfiltersOpen);
  // const closeFiltersWindow = (value) => setisfiltersOpen(false);

  // const {
  //   data = {},
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfinityQuery({
  //   Key: ["news", { ...filters }],
  //   next: getNewsData,
  // });

  const categoriesQuery = searchParams?.categories?.split(",") || [];

  const searchQuery = (searchParams?.search || "").toLocaleLowerCase();

  const data = { pages: getFakeNews(6) };
  const isLoading = false;
  const hasNextPage = false;
  const fetchNextPage = () => {};
  let dataAfterFiltered = categoriesQuery?.length
    ? data?.pages.filter((val) =>
        categoriesQuery?.includes(val?.category?.slug)
      )
    : data?.pages;

  if (searchQuery?.length) {
    dataAfterFiltered = dataAfterFiltered.filter((val) =>
      val?.title?.toLocaleLowerCase().includes(searchQuery)
    );
  }

  const scrollToMainSection = () => scrollToElement("#news-Categories", 100);
  const debouncedFetch = useCallback(
    lodash?.debounce((value) => {
      scrollToMainSection();
      singleValue("search", value, {
        removeIfExists: false,
      });
    }, 600),
    [singleValue]
  );

  const latestNews = data?.pages?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );

  return (
    <div id="news-Categories" className={styles.newsContainer}>
      {latestNews?.length >= 3 && (
        <div className={styles.headSection}>
          <h1 className={styles.headingTitle}>{title}</h1>
          <div className={`${styles.latestCards}`}>
            {latestNews?.slice(0, 3)?.map((item) => (
              <Card key={item._id} product={item} latest={true} />
            ))}
          </div>
        </div>
      )}

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
      </div>
      <VirtuosoGrid
        useWindowScroll
        className={`${styles.list} `}
        data={dataAfterFiltered}
        endReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        overscan={300}
        itemContent={(index, item) => <Card key={item?._id} product={item} />}
        listClassName={styles.gridList}
        itemClassName={styles.gridItem}
      />
      {!isLoading && !data?.pages?.length && (
        <div className={`${styles.emptydata} ShowSmoothEffect flex-c`}>
          No products found
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

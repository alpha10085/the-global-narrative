"use client";
import React, { useCallback, useState } from "react";
import styles from "./List.module.css";
import Card from "../Card/Card";
import { VirtuosoGrid } from "react-virtuoso";
import Skeleton from "@/components/Shared/Skeleton/Skeleton";

import Aos from "@/components/Shared/Animtions/Aos/Aos";
import useInfinityQuery from "@/hooks/useInfinityQuery";
import { getInterviewsData } from "@/lib/interviews";

const List = ({}) => {
  const {
    data = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfinityQuery({
    Key: ["interviews"],
    next: getInterviewsData,
  });

  return (
    <div className={styles.mediaCenterContainer}>
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

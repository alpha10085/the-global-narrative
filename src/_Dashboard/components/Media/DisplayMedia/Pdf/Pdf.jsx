"use client"; // ensure this component is client-side

import { useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import dynamic from "next/dynamic";
import styles from "./Pdf.module.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import useDynamicState from "@/hooks/useDynamicState";
import Skeleton from "@/components/Shared/Skeleton/Skeleton";
import { delay } from "@/utils/time";

// PDF.js worker from public folder
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const Pdf = ({ url, theme, themeConfig }) => {
  const [state, setState] = useDynamicState({
    numPages: 0,
    loading: true,
  });

  const { numPages, loading } = state;

  const onLoad = async ({ numPages }) => {
    setState({ numPages });
    await delay(300);
    setState({ loading: false });
  };

  return (
    <div className={styles.layout}>
      <Document
        className={`${styles.Document} ${!loading && styles.loaded}`}
        file={url}
        onLoadSuccess={onLoad}
      >
        <Swiper
          direction="vertical"
          pagination={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          modules={[Pagination, Mousewheel]}
          className={`${styles.swiper} ${theme.swiper} pdfPreviewSwiper slider-swiper-dashboard`}
        >
          {Array.from({ length: numPages }).map((_, i) => (
            <SwiperSlide key={i}>
              <Page className={styles.page} pageNumber={i + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Document>

      {loading && <Skeleton theme={theme} className="skImage" type="image" />}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Pdf), { ssr: false });

// import Skeleton from '@/Components/Shared/Skeleton/Skeleton';

// import styles from './Pdf.module.css'
// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// function PdfComp({
//     url = "",
//     className = "",
//     themeConfig,
// }) {

//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);

//     }

//     return (
//         <div className={`${styles.layout} ${className}`}>
//             {!numPages && <Skeleton className={styles.Skeleton} />}
//             <div className={`${styles.wraplayout} showSmooth ${themeConfig.scrollBar} ${themeConfig.background} flex column `}>
//                 <p className={`${styles.title} ${themeConfig.bg200}`}>
//                     {numPages ? `${numPages} pages` : ""}
//                 </p>
//                 { }
//                 <Document

//                     className={styles.page}
//                     file={url} onLoadSuccess={onDocumentLoadSuccess}>
//                     {Array.apply(null, Array(numPages))
//                         .map((x, i) => i + 1)
//                         .map((page) => {
//                             return (
//                                 <Page
//                                     key={page}
//                                     className={styles.page}
//                                     pageNumber={page}
//                                     renderTextLayer={false}
//                                     renderAnnotationLayer={false}
//                                 />
//                             );
//                         })}
//                 </Document>

//             </div>
//         </div>
//     );
// }
// export default PdfComp;
// import Img from "@/Components/Shared/img/Img";
// import styles from './Pdf.module.css'

// const Pdf = ({ url }) => {

//     return      <iframe
//     src={url}
//     title="PDF Preview"
//     style={{
//       width: "100%",
//       height: "100%", // Adjust to fit input and header
//       border: "none",
//     }}
//   />
//     const jpgLink = url.replace(".pdf", ".jpg");
//     return (
//         <Img
//             url={jpgLink}
//             className={styles.img}
//         />
//     );
// };
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import styles from "./Pdf.module.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import useDynamicState from "@/hooks/useDynamicState";
import Skeleton from "@/components/Shared/Skeleton/skeleton";
import { delay } from "@/utils/time";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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
    <div className={`${styles.layout} `}>
      <Document
        className={`${styles.Document}  ${!loading && styles.loaded}`}
        file={url}
        onLoadSuccess={onLoad}
      >
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Pagination, Mousewheel]}
          className={`${styles.swiper} ${theme.swiper}  pdfPreviewSwiper slider-swiper-dashboard`}
        >
          {Array.from({
            length: numPages,
          }).map((_, i) => (
            <SwiperSlide key={i}>
              <Page className={styles.page} pageNumber={i + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Document>
      {loading ? (
        <Skeleton theme={theme} className={"skImage"} type="image" />
      ) : (
        ""
      )}
    </div>
  );
};


export default Pdf;

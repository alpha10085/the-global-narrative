import styles from "./window.module.css";
import DropZone from "../../DropZone/DropZone";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { VirtuosoGrid } from "react-virtuoso";
import { delay } from "@/utils/time";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import BlurBg from "@/_Dashboard/components/BlurBg/BlurBg";
import useDisableScroll from "@/hooks/useDisableScroll";
import { useUploadFile } from "../ContextApi/FileUploadCTX";
const Window = ({
  open,
  closeWindow,
  files,
  uploading,
  filesUploaded,
  filesFaileded,
  close,
  callBack,
  clearQueue,
  totalFiles,
  queue,
  translations,
}) => {
  const { theme } = useTheme();
  const swiperRef = useRef(null);
  const [swiperSection, setSwiperSection] = useState(0);
  const [faseOutEffect, setfaseOutEffect] = useState(false);
  const { toggleWindow } = useUploadFile();
  const slideTo = (i = 0) => {
    swiperRef.current.swiper.slideTo(i);
  };
  const AddToQueHandler = (props) => {
    callBack(props);
    slideTo(1);
  };
  const clearQueueAction = async () => {
    setfaseOutEffect(true);
    clearQueue();
    await delay(500);
    setfaseOutEffect(false);
  };
  const scrollHandler = useDisableScroll(toggleWindow);
  const isEmpty = !files?.length && swiperSection === 1;

  useEffect(() => {
    if (isEmpty) slideTo(0);
  }, [isEmpty]);

  return (
    <>
      <BlurBg active={open} onClick={close} />

      <div
        className={` flex ${theme.bord20} column showSmooth ${
          theme.color
        }  ${styles.section} ${styles.wrapper} ${open && styles.open} ${
          theme?.background
        }  flex `}
      >
        <div className={`${styles.head} flex just-sb  gap15`}>
          <div className="flex  gap5">
            <button
              onClick={() => slideTo()}
              className={`${styles.btnHead} ${
                swiperSection === 0 && styles.active
              } ${theme.color} `}
            >
              {translations?.filesWindow?.dropZone}
            </button>
            {files?.length ? (
              <span
                style={{
                  margin: "0 5px",
                }}
                className={`${styles.btnHead}`}
              >
                /
              </span>
            ) : (
              ""
            )}
            {files?.length ? (
              <button
                onClick={() => slideTo(1)}
                className={`${styles.btnHead} ${
                  swiperSection === 1 && styles.active
                } ${theme.color} `}
              >
                {translations?.filesWindow?.uploads}
              </button>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={closeWindow}
            className={`${styles.close} flex-c ${theme.button} ${theme.color}`}
          >
            <CloseIcon />
          </button>
        </div>
        <Swiper
          ref={swiperRef}
          onSlideChange={(e) => setSwiperSection(e.realIndex)}
          allowTouchMove={false}
          simulateTouch={false}
          spaceBetween={10}
          className={`${styles.swiper}  ${faseOutEffect && styles.hide}`}
        >
          <SwiperSlide>
            <DropZone
              translations={translations}
              placeholder={translations?.filesWindow?.drop_ph}
              callBack={AddToQueHandler}
              className={`${styles.DropZone} showSmooth ${theme.color}   flex-c  ${theme?.bg200}`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.overVeiwSlide}>
              {swiperSection === 1 ? <List theme={theme} data={files} /> : ""}
              <div
                className={`${styles.overVeiw} ${theme.background}  flex just-sb al-i-c`}
              >
                <ul
                  className={`flex gap20 al-i-c just-c ${styles.overviesList} wrap`}
                >
                  <li>
                    <DonutSmallIcon />
                    <h1>
                      {translations?.filesWindow?.overview} {totalFiles}
                    </h1>
                  </li>
                  <li
                    className={`${queue?.length ? styles.activeUploading : ""}`}
                  >
                    <HourglassBottomIcon />
                    <h1>
                      {translations?.filesWindow?.uploading} {queue?.length}
                    </h1>
                  </li>
                  <li>
                    <DoneIcon />{" "}
                    <h1>
                      {translations?.filesWindow?.uploaded}{" "}
                      {filesUploaded?.length}
                    </h1>
                  </li>
                  <li>
                    <ErrorOutlineIcon />{" "}
                    <h1>
                      {translations?.filesWindow?.faild} {filesFaileded?.length}
                    </h1>
                  </li>
                </ul>
                <div className="flex mt-5 gap10">
                  {files?.length ? (
                    <button
                      disabled={uploading}
                      onClick={clearQueueAction}
                      className={`${styles.btnDone} showSmooth ${theme.btn30} ${theme.bord20}`}
                    >
                      {translations?.filesWindow?.done}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

const List = ({ data, theme }) => {
  return (
    <VirtuosoGrid
      className={`${styles.list} ${theme.scrollBar} showSmooth `}
      // useWindowScroll
      data={data}
      overscan={500}
      itemContent={(_, item) => {
        return <Card file={item} theme={theme} />;
      }}
      listClassName={styles.gridList}
      itemClassName={styles.gridItem}
    />
  );
};
export default Window;

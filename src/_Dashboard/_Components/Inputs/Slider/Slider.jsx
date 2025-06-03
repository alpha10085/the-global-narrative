"use client";
import React, { useState, useMemo, useCallback, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import styles from "./Slider.module.css";
import Card from "./Components/card/Card";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { isEqual } from "lodash";
import { handleSingle } from "@/utils/object";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import SelectedMedia from "../../boxs/SelectMedia/SelectedMedia";
const Slider = ({
  field = {},
  theme,
  currentValue = [],
  error,
  onChange,
  translations,
  watch,
}) => {
  const { single = false, label = "", max = 5, allowedTypes = [] } = field;
  const [data, setData] = useState(handleSingle(currentValue, single));

  const [openSelectewindow, setopenSelectewindow] = useState(false);
  const reachedMax = single ? false : data?.length === max;
  const getUpdatedData = () => {
    const data_c = watch(field?.name);
    if (single) {
      return { ...(data_c || {}) };
    }
    return [...(data_c || [])];
  };

  const handleDelete = useCallback(
    (item) => {
      if (single) {
        setData(null);
        onChange(field?.name, null);
      } else {
        setData((prevData) => {
          let newVal = prevData?.filter((img) => img?._id !== item?._id);
          onChange(field?.name, newVal);
          return newVal;
        });
      }
    },
    [single]
  );
  const isEmpty = (obj) => {
    // Check if obj is an object
    if (typeof obj === "object" && obj !== null) {
      // If obj is an array, check its length
      if (Array.isArray(obj)) {
        return obj.length === 0;
      } else {
        // If obj is an object, check if it has no own properties
        return Object.keys(obj).length === 0;
      }
    }

    // If obj is not an object or null, return false (not empty)
    return true;
  };
  const handleopenSelectewindow = () => {
    if (reachedMax) return;
    setopenSelectewindow(true);
  };
  const handleSelect = (items) => {
    setopenSelectewindow(false);
    // handle error cases
    if (!items || !items?.length) {
      return;
    }
    // handle single case
    if (single) {
      let newvalue = items?.[0];
      setData(newvalue);
      onChange(field?.name, newvalue);
    } else {
      let newvalue = [...items].slice(0, max);
      // handle check for max length
      onChange(field?.name, newvalue);
      setData(newvalue);
    }
  };

  // Move element up (swap with previous element)
  const moveUp = (index) => {
    let arr = getUpdatedData();
    const newIndex = index === 0 ? arr.length - 1 : index - 1; // Wrap to end if at start
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setData(arr);
    onChange(field?.name, arr);
  };

  // Move element down (swap with next element)
  const moveDown = (index) => {
    let arr = getUpdatedData();
    const newIndex = index === arr.length - 1 ? 0 : index + 1; // Wrap to start if at end
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setData(arr);
    onChange(field?.name, arr);
  };
  const sliderContent = useMemo(() => {
    if (single) {
      return data?.url ? (
        <SwiperSlide className={styles.swiperSlide}>
          <Card
            onDelete={() => handleDelete(data)}
            theme={theme}
            item={data}
            key={data?.url || index}
            single
          />
        </SwiperSlide>
      ) : null;
    }
    if (!data || !data?.length) return null;
    return data?.map((item, index) => (
      <SwiperSlide className={styles.swiperSlide} key={`${item?._id}-${index}`}>
        <Card
          className={styles.card}
          onDelete={() => handleDelete(item)}
          theme={theme}
          item={item}
          index={index}
          length={data?.length || 0}
          key={item?.url || index}
          moveDown={() => moveDown(index)}
          moveUp={() => moveUp(index)}
        />
      </SwiperSlide>
    ));
  }, [data, theme?.name]);
  let swiperConfig = useMemo(() => {
    return single
      ? {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      : {
          slidesPerView: 1,
          spaceBetween: 10,

          breakpoints: {
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            645: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // When the viewport is 768px or wider
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1025: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // When the viewport is 1024px or wider
            1300: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          },
        };
  }, []);

  return (
    <>
      <div
        id={handleReplaceDot(field?.name)}
        className={`${styles.layout}  flex column `}
      >
        {label && (
          <h1 className={styles.label}>
            {label} {!!data?.length && `(${data?.length} / ${max})`}
          </h1>
        )}
        <ErrorMessage theme={theme} message={error} label={label} />
        <div
          className={` ${styles.mediaLayout} ${theme.bgMedia} ${theme.bord20} flex-c`}
        >
          <div
            onClick={handleopenSelectewindow}
            className={`flex-c ${theme.button} mb10     column gap10 ${styles.emptylayout} ${theme.background}`}
          >
            {reachedMax ? (
              `Full`
            ) : (
              <LibraryAddIcon className={styles.addIcon} />
            )}
          </div>

          <Swiper
            {...swiperConfig}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
           
            keyboard={true}
            navigation={false}
            modules={[Navigation, Pagination, Mousewheel]}
            className={`${styles.wrapper}  slider-swiper-dashboard ${theme.swiper} `}
          >
            {sliderContent}
          </Swiper>
          {isEmpty(data) && (
            <span
              onClick={handleopenSelectewindow}
              className={` ${styles.btnadd} showSmooth flex-c gap10 column`}
            >
              <AddPhotoAlternateIcon />
              {translations?.slider?.clickAdd}
            </span>
          )}
        </div>
      </div>
      {openSelectewindow && (
        <SelectedMedia
          onClose={() => setopenSelectewindow(false)}
          {...field}
          single={single}
          current={data}
          callback={handleSelect}
          translations={translations}
        />
      )}
    </>
  );
};

export default memo(Slider, (p, n) => {
  return (
    isEqual(p.currentValue, n.currentValue) &&
    p?.field?.name === n?.field?.name &&
    p.error === n.error
  );
});

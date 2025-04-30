/* eslint-disable react-hooks/exhaustive-deps */
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useHash from "./useHash";

export const useSwiperRouter = (allSlides = [], Init = null) => {
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const hash = useHash();
  const onSlideChange = ({ activeIndex = 0 } = {}) => {
    let path = allSlides?.find((val, i) => i === activeIndex) || "";
    router.replace(
      `${pathname}#${path}`,
      {
        scroll: false,
      },
      { shallow: true }
    );
  };

  const getSlideIndexFromHash = () => {
    // const url = new URL(window.location.href);
    // const hash = Init || url.hash.substring(1); // Remove the leading '#'
    let index = allSlides?.findIndex((val, i) => val === hash);
    index = index < 0 ? 0 : index;
    return slideTo(index, 0);
  };

  const slideTo = (index, speed = 500) => {
    ref.current?.swiper?.slideTo(index, speed);
  };
  useEffect(() => {
    getSlideIndexFromHash();
  }, [hash]);
  return { onSlideChange, ref };
};

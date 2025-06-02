"use client";
import Skeleton from "@/components/Shared/Skeleton/skeleton";
import "./Img.css";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { delay } from "@/utils/time";
function getClosestStandardRatio(width, height) {
  const standardRatios = [
    { label: "1/1", value: 1 },
    { label: "4/3", value: 4 / 3 },
    { label: "3/2", value: 3 / 2 },
    { label: "16/10", value: 16 / 10 },
    { label: "16/9", value: 16 / 9 },
    { label: "21/9", value: 21 / 9 },
    { label: "2/1", value: 2 / 1 },
  ];

  const actualRatio = width / height;
  let closest = standardRatios[0];

  for (const ratio of standardRatios) {
    if (
      Math.abs(actualRatio - ratio.value) <
      Math.abs(actualRatio - closest.value)
    ) {
      closest = ratio;
    }
  }

  return closest.label;
}

const Img = ({
  url = null,
  alt = "",
  withEffect = true,
  disableSkeleton = false,
  className = "",
  mainClassName = "",
  onLoadClassName = "",
  errorImg = null,
  children,
  AsyncLoading = false,
  onClick = () => {},
  theme = "light",
  maxRetryCount = 3,
  delayLoad = 0,
  onLoad = () => {},
}) => {
  const wrapperRef = useRef(null);
  const [hasErrorImg, setHasErrorImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [ratio, setRatio] = useState(null);
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  const handleOnErrorImg = useCallback(() => {
    if (retryCount < maxRetryCount && url) {
      setHasErrorImg(true);
      setLoading(true);
      handleRetry();
    }
  }, [retryCount, maxRetryCount, url, handleRetry]);

  const updateRatio = () => {
    const div = wrapperRef.current;
    if (div) {
      const { width, height } = div.getBoundingClientRect();
      if (width && height) {
        setRatio(getClosestStandardRatio(width, height));
      }
    }
  };
  const handleLoad = useCallback(async () => {
    await delay(delayLoad);
    setLoading(false);
    onLoad();
    updateRatio();
  }, [delayLoad, onLoad]);
  useEffect(() => {
    if (url) {
      setLoading(true);
      setRetryCount(0);
      setHasErrorImg(false);
    }
  }, [url]);

  const formattedSrc =
    !url || hasErrorImg
      ? "/"
      : url.startsWith("http") ||
        url.startsWith("data") ||
        url.startsWith("blob:")
      ? url
      : `/media${url}`;

  return (
    <div
      ref={wrapperRef}
      key={url}
      onClick={onClick}
      className={`${className} ${!loading && onLoadClassName} p-relative`}
    >
      {/* <div className={`flex-c ratio-title`}>

      {ratio}
    </div> */}
      {!AsyncLoading && url && (
        <Image
          key={`${formattedSrc}-${retryCount}-${hasErrorImg ? "unopt" : "opt"}`}
          alt={alt}
          quality={100}
          fill
          unoptimized={hasErrorImg}
          style={{ objectFit: "cover" }}
          loading="lazy"
          onLoad={handleLoad}
          src={formattedSrc}
          className={`main-component-image ${mainClassName} ${
            withEffect ? "blurring-image" : ""
          }`}
          onError={handleOnErrorImg}
          img-loaded={!loading ? "true" : undefined}
          sizes="(max-width: 640px) 400px, (max-width: 768px) 600px,100vw"
        />
      )}

      {(loading || (!errorImg && hasErrorImg)) && !disableSkeleton && (
        <Skeleton theme={theme} className="skImage" type="image" />
      )}

      {!loading && children}
    </div>
  );
};

export default Img;

"use client";
import Skeleton from "@/components/Shared/Skeleton/skeleton";
import "./Img.css";
import { useEffect, useState, useCallback, forwardRef } from "react";
import Image from "next/image";
import { delay } from "@/utils/time";

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
},ref) => {

  
  const [hasErrorImg, setHasErrorImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  const handleOnErrorImg = useCallback(
    (event) => {
      if (retryCount < maxRetryCount && url) {
        handleRetry();
        setHasErrorImg(true);
        setLoading(false);
      }
    },
    [retryCount, maxRetryCount, url, handleRetry]
  );

  const handleLoad = useCallback(async () => {
    await delay(delayLoad);
    setLoading(false);
    onLoad();
  }, [delayLoad, onLoad]);

  useEffect(() => {
    if (url) {
      setLoading(true);
      setRetryCount(0);
      setHasErrorImg(false);
    }
  }, [url]);


  url  =url?.toString() 
  
  const formattedSrc =
  !url || hasErrorImg
    ? "/"
    : url.startsWith("http") || url.startsWith("data") || url.startsWith("blob:")
    ? url
    : `/media${url}`;

  return (
    <div
    ref={ref}
      key={url}
      onClick={onClick}
      className={`${className} ${!loading && onLoadClassName} p-relative`}
    >
      {!AsyncLoading && url && (
        <Image
          alt={alt}
          quality={100}
          fill
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

export default forwardRef(Img)

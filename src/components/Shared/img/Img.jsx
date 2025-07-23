"use client";
import Skeleton from "@/components/Shared/Skeleton/Skeleton";
import "./Img.css";
import { useEffect, useState, useCallback, forwardRef } from "react";
import Image from "next/image";
import { delay } from "@/utils/delay"; // Match the original import
import { handleUrl } from "./helpers";

const Img = (
  {
    url = "",
    alt = "",
    withEffect = true,
    className = "",
    mainClassName = "",
    errorImg = null,
    children,
    AsyncLoading = false,
    onClick = () => {},
    theme = "light",
    maxRetryCount = 3,
    delayLoad = 0,
    classNameOnload = "",
    unoptimized = false,
    disableSkeleton = false,
    style = {}
  },
  ref
) => {
  const baseSrc = handleUrl(url);
  const [hasErrorImg, setHasErrorImg] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOnErrorImg = useCallback(
    (payload) => {
      setHasErrorImg(true);
      setLoading(true);
    },
    [maxRetryCount]
  );

  const handleLoad = useCallback(
    async (payload) => {
      await delay(delayLoad);
      setLoading(false);
    },
    [delayLoad]
  );

  useEffect(() => {
    if (url) {
      setLoading(true);
      setHasErrorImg(false);
    }
  }, [url]);

  if (hasErrorImg && maxRetryCount > 0)
    return (
      <Img
        ref={ref}
        url={url}
        alt={alt}
        withEffect={withEffect}
        className={className}
        mainClassName={mainClassName}
        errorImg={errorImg}
        AsyncLoading={AsyncLoading}
        onClick={onClick}
        theme={theme}
        maxRetryCount={maxRetryCount > 0 ? maxRetryCount - 1 : 0}
        delayLoad={delayLoad}
        classNameOnload={classNameOnload}
        unoptimized={true}
        disableSkeleton={disableSkeleton}
      >
        {children}
      </Img>
    );

  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        style={style}
        className={`${className} p-relative ${!loading && classNameOnload} p-relative`}
      >
        {!AsyncLoading && (
          <Image
            key={`${baseSrc}-${hasErrorImg ? "unopt" : "opt"}`}
            alt={alt}
            quality={100}
            fill
            unoptimized={unoptimized}
            style={{ objectFit: "cover" }}
            loading="lazy"
            onLoad={handleLoad}
            src={baseSrc}
            className={`main-component-image ${mainClassName} blurring-image`}
            onError={handleOnErrorImg}
            img-loaded={!loading ? "true" : undefined}
            sizes="(max-width: 640px) 400px, (max-width: 768px) 600px,100vw"
          />
        )}

        {loading && !disableSkeleton ? (
          <Skeleton theme={theme} className="skImage" type="image" />
        ) : null}
      </div>
      {!loading && children}
    </>
  );
};

export default forwardRef(Img);

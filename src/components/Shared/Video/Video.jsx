"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import Skeleton from "../Skeleton/skeleton";
import Img from "../img/Img";
import { delay } from "@/utils/time";

const VideoPlayer = ({
  url = "",
  poster = "",
  controls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  className = "",
  withEffect = false,
  theme = "light",
  imgAsloadingScreen = undefined,
  urlForMobil = null,
}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videourl, setVideourl] = useState(url);
  const handleCanPlayThrough = () => {
    // if (autoPlay && videoRef?.current) {
    //   videoRef.current.play();
    // }
  };

  const handleVideoError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    const updateVideourl = () => {
      // Check window width and update video source accordingly
      if (window.innerWidth < 768) {
        setVideourl(urlForMobil || url);
      } else {
        setVideourl(url);
      }
    };

    // Set video source on mount
    updateVideourl();

    // Listen to window resize and update video source accordingly
    window.addEventListener("resize", updateVideourl);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateVideourl);
    };
  }, [url, urlForMobil]);

  return (
    <div className={`${styles.wrapper} p-relative ${className}`}>
      {/* {loading ? (
        imgAsloadingScreen ? (
          <Img  className={`${styles.thume}`} url={imgAsloadingScreen} />
        ) : (
          withEffect ? <Skeleton theme={theme} className={styles.skImage} type="image" /> : ''
        )
      ) : (
        ""
      )} */}
      {error ? (
        <Skeleton theme={theme} className={styles.skImage} type="image" />
      ) : (
        <video
          ref={videoRef}
          src={videourl}
          poster={poster}
          controls={controls}
          loop={loop}
          muted={true}
          playsInline
          autoPlay={autoPlay}
          // onLoadedData={() => setLoading(false)}
          onCanPlayThrough={handleCanPlayThrough}
          onError={handleVideoError}
          data-loaded={loading ? undefined : "true"}
          preload="preload" // Preload more data for smoother playback
          className={`${withEffect ? styles.blurring : ""} ${styles.video}`}
        />
      )}
    </div>
  );
};

export default VideoPlayer;

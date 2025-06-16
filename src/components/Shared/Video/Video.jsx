"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import Skeleton from "../Skeleton/Skeleton";
import Img from "../img/Img";
import DynamicVolume from "./icons";
import { useInView } from "react-intersection-observer";

const VideoPlayer = ({
  url = "",
  poster = "",
  controls = false,
  autoPlay = true,
  loop = true,
  className = "",
  withEffect = false,
  theme = "light",
  urlForMobil = null,
  thumbnail = null,
  allowChangeSound = false,
  muted = true,
}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videourl, setVideourl] = useState(url);
  const [isMuted, setIsMuted] = useState(muted);
  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    onChange: (inView = false) => {
      if (!isMuted) setIsMuted(!inView);
    },
  });
  const handleCanPlayThrough = () => {
    if (autoPlay && videoRef?.current) {
      videoRef.current.play();
      setLoading(false);
    }
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
    <div ref={ref} className={`${styles.wrapper} p-relative ${className}`}>
      {loading ? (
        thumbnail ? (
          <Img
            withEffect={false}
            className={`${className} ${styles.thume}`}
            url={thumbnail}
          />
        ) : withEffect ? (
          <Skeleton theme={theme} className={styles.skImage} type="image" />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {error ? (
        <Skeleton theme={theme} className={styles.skImage} type="image" />
      ) : (
        <video
          ref={videoRef}
          src={videourl}
          poster={poster}
          controls={controls}
          loop={loop}
          muted={isMuted}
          playsInline
          autoPlay={autoPlay}
          onLoadedData={() => setLoading(false)}
          onCanPlayThrough={handleCanPlayThrough}
          onError={handleVideoError}
          data-loaded={loading ? undefined : "true"}
          preload="preload" // Preload more data for smoother playback
          className={`${withEffect ? styles.blurring : ""} ${styles.video}`}
        />
      )}
      <div className={styles.sounedState}>
        <DynamicVolume value={isMuted} onChange={(e) => setIsMuted(e)} />
      </div>
    </div>
  );
};

export default VideoPlayer;

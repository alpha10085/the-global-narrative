"use client";

import { useInView } from "react-intersection-observer";
import Img from "../img/Img";
import Skeleton from "../Skeleton/Skeleton";
import { useState, useRef, useEffect } from "react";
import DynamicVolume from "./icons";
import eventBus from "@/utils/eventBus";
import styles from "./styles.module.css";

const VideoPlayer = ({
  url = "",
  urlForMobil = null,
  controls = false,
  autoPlay = true,
  loop = true,
  className = "",
  withEffect = false,
  theme = "light",
  thumbnail = null,
  allowChangeSound = false,
  muted = true,
  videoKey = Date.now(),

  // New feature — does not affect old usages
  playOnHover = false,
  resetOnMouseLeave = true,
}) => {
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videourl, setVideourl] = useState("");
  const [isMuted, setIsMuted] = useState(muted);
  const [pendingPlay, setPendingPlay] = useState(false);

  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    onChange: (inView = false) => {
      setIsMuted((prev) => (prev ? prev : !inView));
    },
  });

  const playVideo = () => {
    if (!videoRef.current) return;

    if (loading) {
      setPendingPlay(true);
      return;
    }

    videoRef.current.play().catch(() => {});
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setPendingPlay(false);
  };

  const handleMouseEnter = () => {
    if (!playOnHover) return;

    playVideo();
  };

  const handleMouseLeave = () => {
    if (!playOnHover) return;

    pauseVideo();

    if (resetOnMouseLeave && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleCanPlayThrough = () => {
    setLoading(false);

    // Normal old behavior only
    if (autoPlay && !playOnHover) {
      videoRef.current?.play().catch(() => {});
    }

    if (pendingPlay) {
      videoRef.current?.play().catch(() => {});
      setPendingPlay(false);
    }
  };

  const handleVideoError = () => {
    setLoading(false);
    setError(true);
    setPendingPlay(false);
  };

  useEffect(() => {
    const updateVideourl = () => {
      const isMobile = window.innerWidth < 768;
      setVideourl(isMobile ? urlForMobil || url : url);
    };

    updateVideourl();

    window.addEventListener("resize", updateVideourl);

    return () => window.removeEventListener("resize", updateVideourl);
  }, [url, urlForMobil]);

  useEffect(() => {
    const handleEvent = (value) => {
      if (value === "play") playVideo();
      if (value === "pause") pauseVideo();
    };

    eventBus.on(videoKey, handleEvent);

    return () => {
      eventBus.off(videoKey, handleEvent);
    };
  }, [videoKey, loading]);

  if (!videourl) return null;

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} p-relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {loading && !error ? (
        thumbnail ? (
          <Img
            withEffect={false}
            className={`${className} ${styles.thume}`}
            url={thumbnail}
          />
        ) : withEffect ? (
          <Skeleton theme={theme} className={styles.skImage} type="image" />
        ) : null
      ) : null}

      {error ? (
        <Skeleton theme={theme} className={styles.skImage} type="image" />
      ) : (
        <video
          ref={videoRef}
          src={videourl}
          controls={controls}
          loop={loop}
          muted={isMuted}
          playsInline
          autoPlay={autoPlay && !playOnHover}
          onLoadedData={() => setLoading(false)}
          onCanPlayThrough={handleCanPlayThrough}
          onError={handleVideoError}
          data-loaded={!loading ? "true" : undefined}
          preload="auto"
          className={`${withEffect ? styles.blurring : ""} ${styles.video}`}
        />
      )}

      {allowChangeSound && (
        <div className={styles.sounedState}>
          <DynamicVolume value={isMuted} onChange={setIsMuted} />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
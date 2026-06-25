"use client";

import { useInView } from "react-intersection-observer";
import Img from "../img/Img";
import Skeleton from "../Skeleton/Skeleton";
import { useState, useRef, useEffect, useCallback } from "react";
import DynamicVolume from "./icons";
import eventBus from "@/utils/eventBus";
import styles from "./styles.module.css";
import { useClickOut } from "@/hooks/useClickout";

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
  playOnHover = false,
  resetOnMouseLeave = false,
  canPlayAndPause = false,
  hideThumbnailOnClick = false,
  hideThumbnailOnLoaded = true,
}) => {
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [pendingPlay, setPendingPlay] = useState(false);
  const [hasClickedToPlay, setHasClickedToPlay] = useState(false);
  const [showThumbnailOnPause, setShowThumbnailOnPause] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // ✅ حساب الـ URL مرة واحدة بدون resize listener
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const videourl = isMobile ? urlForMobil || url : url;

  const { ref: inViewRef } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    onChange: (inView) => {
      setIsInView(inView);
      setIsMuted((prev) => (prev ? prev : !inView));

      // ✅ إيقاف الفيديو لما يخرج من الشاشة لتوفير الموارد
      if (!inView && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    },
  });

  const playVideo = useCallback(() => {
    if (!videoRef.current) return;
    setShowThumbnailOnPause(false);
    if (hideThumbnailOnClick) setHasClickedToPlay(true);
    if (loading) { setPendingPlay(true); return; }
    videoRef.current.play().catch(() => {});
  }, [loading, hideThumbnailOnClick]);

  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setPendingPlay(false);
    if (playOnHover || !hideThumbnailOnClick) setShowThumbnailOnPause(true);
  }, [playOnHover, hideThumbnailOnClick]);

  const { ref: trackerRef } = useClickOut({
    onClickOutside: () => {
      if (!resetOnMouseLeave) return;
      pauseVideo();
      setShowThumbnailOnPause(true);
      if (videoRef.current) videoRef.current.currentTime = 0;
    },
  });

  // ✅ canPlayThrough بس — مش مع loadedData
  const handleCanPlayThrough = useCallback(() => {
    setLoading(false);
    const shouldAutoPlay = autoPlay && !playOnHover && !hideThumbnailOnClick;
    if (shouldAutoPlay || pendingPlay) {
      videoRef.current?.play().catch(() => {});
      setPendingPlay(false);
    }
  }, [autoPlay, playOnHover, hideThumbnailOnClick, pendingPlay]);

  const handleVideoError = () => {
    setLoading(false);
    setError(true);
    setPendingPlay(false);
  };

  const handleMouseEnter = () => { if (playOnHover) playVideo(); };
  const handleMouseLeave = (e) => {
    if (!playOnHover) return;
    
  // ✅ لو الـ target أو الـ relatedTarget SVG، ignore
  if (e.target instanceof SVGElement || e.relatedTarget instanceof SVGElement) return;

    pauseVideo();
    if (resetOnMouseLeave && videoRef.current) videoRef.current.currentTime = 0;
  };

  const handleWrapperClick = () => { if (hideThumbnailOnClick) playVideo(); };
  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (!canPlayAndPause || !videoRef.current) return;
    videoRef.current.paused ? playVideo() : pauseVideo();
  };

  useEffect(() => {
    const handleEvent = (value) => {
      if (value === "play") playVideo();
      if (value === "pause") pauseVideo();
    };
    eventBus.on(videoKey, handleEvent);
    return () => eventBus.off(videoKey, handleEvent);
  }, [videoKey, playVideo, pauseVideo]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPendingPlay(false);
    setHasClickedToPlay(false);
    setShowThumbnailOnPause(false);
  }, [videourl]);

  if (!videourl) return null;

  const shouldHideThumbnailByClick = hideThumbnailOnClick && hasClickedToPlay && !showThumbnailOnPause;
  const shouldShowThumbnail = !!thumbnail && !error && !shouldHideThumbnailByClick && (!hideThumbnailOnLoaded || loading || showThumbnailOnPause);
  const shouldShowLoading = loading && !error && (!thumbnail || shouldHideThumbnailByClick);

  return (
    <div
      ref={(node) => {
        inViewRef(node);
        if (typeof trackerRef === "function") trackerRef(node);
        else if (trackerRef) trackerRef.current = node;
      }}
      className={`${styles.wrapper} p-relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleWrapperClick}
    >
      {shouldShowThumbnail && (
        <Img withEffect={false} className={styles.thume} url={thumbnail} />
      )}

      {shouldShowLoading && (
        <Skeleton theme={theme} className={styles.skImage} type="image" />
      )}

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
          autoPlay={autoPlay && !playOnHover && !hideThumbnailOnClick}
          onClick={handleVideoClick}
          onCanPlayThrough={handleCanPlayThrough}  // ✅ واحدة بس
          onError={handleVideoError}
          onPause={() => { if (playOnHover || !hideThumbnailOnClick) setShowThumbnailOnPause(true); }}
          onPlay={() => setShowThumbnailOnPause(false)}
          data-loaded={!loading ? "true" : undefined}
          preload={isInView ? "auto" : "none"}  // ✅ التحميل بس لما يكون في الشاشة
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
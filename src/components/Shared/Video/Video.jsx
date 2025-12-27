"use client"
import { useInView } from "react-intersection-observer";
import Img from "../Img/Img";
import Skeleton from "../Skeleton/Skeleton";
import { useState, useRef } from "react";
import DynamicVolume from "./icons";
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
}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videourl, setVideourl] = useState("");
  const [isMuted, setIsMuted] = useState(muted);
  const [pendingPlay, setPendingPlay] = useState(false); // ✅ new state

  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    onChange: (inView = false) => {
      setIsMuted((prev) => (prev ? prev : !inView));
    },
  });

  const handleCanPlayThrough = () => {
    setLoading(false);
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (pendingPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPendingPlay(false); // ✅ clear pending
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
      const selectedUrl = isMobile ? urlForMobil || url : url;
      setVideourl(selectedUrl);
    };

    updateVideourl();
    window.addEventListener("resize", updateVideourl);
    return () => window.removeEventListener("resize", updateVideourl);
  }, [url, urlForMobil]);

  useEffect(() => {
    const handleEvent = (value) => {
      if (!videoRef.current) return;

      if (value === "play") {
        if (loading) {
          // ✅ remember play request
          setPendingPlay(true);
        } else {
          videoRef.current.play().catch(() => {});
        }
      } else if (value === "pause") {
        videoRef.current.pause();
        setPendingPlay(false); // cancel pending play if pause requested
      }
    };

    eventBus.on(videoKey, handleEvent);
    return () => {
      eventBus.off(videoKey, handleEvent);
    };
  }, [videoKey, loading]);

  if (!videourl) return null;

  return (
    <div ref={ref} className={`${styles.wrapper} p-relative ${className}`}>
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
      ) : videourl ? (
        <video
          ref={videoRef}
          src={videourl}
          controls={controls}
          loop={loop}
          muted={isMuted}
          playsInline
          autoPlay={autoPlay}
          onLoadedData={() => setLoading(false)}
          onCanPlayThrough={handleCanPlayThrough}
          onError={handleVideoError}
          data-loaded={!loading ? "true" : undefined}
          preload="auto"
          className={`${withEffect ? styles.blurring : ""} ${styles.video}`}
        />
      ) : null}

      {allowChangeSound && (
        <div className={styles.sounedState}>
          <DynamicVolume value={isMuted} onChange={setIsMuted} />
        </div>
      )}
    </div>
  );
};


export default VideoPlayer 
"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoPlayback.module.css";

import { delay } from "@/utils/time";
import Img from "@/components/Shared/img/Img";
import { useClickOut } from "@/hooks/useClickout";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Spinner from "@/components/Shared/Spinner/Spinner";
const VideoPlayer = ({
  url = "",
  poster = "",
  controls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  className = "",
  withEffect = true,
  urlForMobil = null,
  thumbnail = "",
  mainClassName = "",
}) => {
  const { theme } = useTheme();

  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shoeThumbnail, setShowThumbnail] = useState(false);

  const handleCanPlayThrough = () => {
    setLoading(false);
  };

  const handleVideoError = () => {
    setLoading(false);
    setError(true);
  };

  const onMouseLeave = () => {
    setShowThumbnail(false);
    setLoading(true);
  };
  const { ref } = useClickOut({
    onClickOutside: onMouseLeave,
  });

  useEffect(() => {
    if (!loading && videoRef.current) {
      videoRef.current.play();
    }
  }, [loading]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setShowThumbnail(true)}
      onMouseOut={onMouseLeave}
      className={`video-card-dashboard ${styles.wrapper}  ${className}`}
    >
      {!shoeThumbnail ? (
        <>
          <button
            className={`${styles.buttonPlay} flex-c ${theme.bg_overlay} ${theme.color} `}
          >
            <PlayArrowIcon />
          </button>
          <Img
            className={`  ${styles.thume}`}
            url={thumbnail}
            theme={theme?.name}
          />
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={url}
            poster={poster}
            controls={controls}
            autoPlay={autoPlay} // Handle autoplay programmatically after enough data is loaded
            loop={loop}
            muted={muted}
            playsInline
            onCanPlayThrough={handleCanPlayThrough}
            onError={handleVideoError}
            data-loaded={loading ? undefined : "true"}
            preload="metadata" // Preload more data for smoother playback
            className={` ${withEffect ? styles.blurring : ""} ${
              styles.video
            } ${mainClassName}`}
          />
          {loading && (
            <div
              style={{
                height: "100%",
                zIndex: 100,
              }}
              className={`flex-c w-100  ${styles.loader}`}
            >
              <Spinner size={30} theme={theme.name} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;

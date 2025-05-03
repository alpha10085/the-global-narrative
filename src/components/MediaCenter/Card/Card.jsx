"use client";
import { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";

const Card = ({ product = {}, className = "" }) => {
  const hoverTimeoutRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const isPlayingRef = useRef(false);
  const videoRef = useRef(null);

  const setVideoRef = (node) => {
    if (!node) return;
    videoRef.current = node;

    node.onplaying = () => (isPlayingRef.current = true);
    node.onpause = () => (isPlayingRef.current = false);
  };

  const playVideo = async () => {
    const video = videoRef.current;
    if (video && video.paused && !isPlayingRef.current) {
      try {
        await video.play();
      } catch (err) {
        console.error("Video play failed:", err);
      }
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (video && !video.paused && isPlayingRef.current) {
      video.pause();
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPoster(false);
      setIsHovering(true);
      setShouldLoadVideo(true);
      playVideo();
    }, 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovering(false);
    setShowPoster(true);
    setShouldLoadVideo(false);
    pauseVideo();
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    }
  };

  return (
    <div
      className={`${styles.card} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.videoWrapper}>
        {showPoster && (
          <Img
            url={product?.poster?.url}
            alt="Poster"
            className={styles.poster}
          />
        )}

        <video
          ref={setVideoRef}
          className={`${styles.video} ${showPoster ? styles.hidden : ""}`}
          poster={product?.poster?.url}
          preload="none"
          muted
        >
          {shouldLoadVideo && (
            <source src={product?.video?.url} type="video/mp4" />
          )}
        </video>

        <div className={styles.cardOverlay}></div>

        <div className={styles.text}>
          <div className={styles.subtitle}>Continue Course</div>
          <div className={styles.title}>{product?.title}</div>
        </div>

        <button
          className={styles.playButton}
          onClick={isHovering ? handleFullscreen : handleMouseEnter}
          aria-label={isHovering ? "Fullscreen" : "Play Video"}
        >
          {isHovering ? <FullscreenIcon /> : <PlayArrowIcon />}
        </button>
      </div>
    </div>
  );
};

export default Card;

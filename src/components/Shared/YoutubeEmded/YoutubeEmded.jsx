"use client";
import { useState } from "react";
import styles from "./YouTubeEmbed.module.css";
import Skeleton from "../Skeleton/skeleton";
import { getSearchParam } from "@/utils/query";
import Img from "../img/Img";
import { customText } from "@/utils/text";
import { useClickOut } from "@/hooks/useClickout";
import { delay } from "@/utils/time";
import Spinner from "../Spinner/Spinner";

const YouTubeEmbed = ({
  link,
  theme,
  className,
  title = "",
  channelPicture = "",
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
  const { ref } = useClickOut({
    onClickOutside: () => {
      setShowVideo(false);
      setStartVideo(false);
    },
  });
  const videoId = getSearchParam(link, "v");
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleStartVideo = () => {
    setStartVideo(true);
  };

  return (
    <div ref={ref} className={`${styles.section} ${className}`}>
      {!startVideo && (
        <div
          onClick={handleShowVideo}
          className={`${styles.videoPoster} w-100`}
        >
          <div className={`${styles.head} flex al-i-c gap10 w-100`}>
            {channelPicture && (
              <Img className={styles.channelPicture} url={channelPicture} />
            )}
            {title && <p>{customText(title, 38)}</p>}
          </div>
          <Img url={thumbnail} className={`${styles.overlay} ${className}`} />
          <button className={styles.youtubeIcon}>
            {showVideo ? (
              <Spinner size={60} color="white" />
            ) : (
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path
                  className="ytp-large-play-button-bg"
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#f00"
                ></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            )}
          </button>
        </div>
      )}
      {showVideo && (
        <IframeEmbed
          videoId={videoId}
          theme={theme}
          handleStartVideo={handleStartVideo}
          startVideo={startVideo}
        />
      )}
    </div>
  );
};

const IframeEmbed = ({ videoId, theme, handleStartVideo, startVideo }) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube"
      onLoad={handleStartVideo}
      className={`${startVideo && styles.active}`}
    />
  );
};

export default YouTubeEmbed;

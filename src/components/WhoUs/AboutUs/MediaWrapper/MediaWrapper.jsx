"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Img from "@/components/Shared/img/Img";
import VideoPlayer from "@/components/Shared/Video/Video";
import { delay } from "@/utils/delay";
import styles from "./MediaWrapper.module.css";

const MediaWrapper = ({ className = "", mediaUrl, type }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [delayedInView, setDelayedInView] = useState(false);

  useEffect(() => {
    const handleDelay = async () => {
      if (inView) {
        await delay(100);
        setDelayedInView(true);
      } else {
        setDelayedInView(false);
      }
    };

    handleDelay();
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`${styles.mediaWrapper}  ${className} ${
        delayedInView ? styles.inView : ""
      }`}
    >
      {!mediaUrl ? null : type === "image" ? (
        <Img
          autoPlay
          className={`${styles.media}`}
          loop
          theme="dark"
          muted
          url={mediaUrl}
        />
      ) : (
        <VideoPlayer
          autoPlay
          className={`${styles.media}`}
          loop
          theme="dark"
          muted
          url={mediaUrl}
        />
      )}
    </div>
  );
};

export default MediaWrapper;

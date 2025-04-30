"use client";
import Skeleton from "@/components/Shared/Skeleton/skeleton";
import styles from "./GoogleMap.module.css";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { delay } from "@/utils/time";
const GoogleMap = ({
  url = "",
  alt = "",
  withEffect = true,
  className = "",
  theme = "light",
  lazyLoad = true,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(true);
  const handleLoad = async () => {
    await delay(200)
    setLoading(false)
  };
  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`}>
      {(lazyLoad ? inView : true) && (
        <iframe
          title="Google Map"
          width="600"
          height="450"
          frameBorder="0"
          src={url}
          loading="lazy"
          onLoad={handleLoad}
          allowFullScreen={false}
          className={`main-component-image ${
            withEffect ? "blurring-image" : ""
          }`}
          img-loaded={loading ? undefined : "true"}
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
      {loading && withEffect ? (
        <Skeleton theme={theme} className={"skImage"} type="image" />
      ) : (
        ""
      )}
    </div>
  );
};

export default GoogleMap;

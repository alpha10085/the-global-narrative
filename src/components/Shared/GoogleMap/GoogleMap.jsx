"use client";
import Skeleton from "@/components/Shared/Skeleton/Skeleton";
import styles from "./GoogleMap.module.css";
import { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { delay } from "@/utils/time";


const extractSrcFromIframe = (input = "") => {
  // If input is already a valid Google Maps embed link, return it as-is
  if (input.startsWith("https://www.google.com/maps/embed?")) return input;

  // Otherwise try to extract from iframe string
  const match = input.match(/src="([^"]+)"/);
  return match ? match[1] : "";
};

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

  // Memoize extracted URL to avoid recalculating every render
  const extractedUrl = useMemo(() => extractSrcFromIframe(url), [url]);

  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`}>
      {(lazyLoad ? inView : true) && (
        <iframe
          title="Google Map"
          width="600"
          height="450"
          frameBorder="0"
          src={extractedUrl}
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

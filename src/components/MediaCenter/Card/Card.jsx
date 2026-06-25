import YouTubeEmbed from "@/components/Shared/YoutubeEmded/YoutubeEmded";
import styles from "./Card.module.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useEffect, useState } from "react";
import { customText } from "@/utils/text";
import VideoPlayer from "@/components/Shared/Video/Video";

const Card = ({ val, index }) => {
  console.log("🚀 ~ Card ~ val:", val);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), index * 150); // Change 5000 to your desired delay in milliseconds.
  }, []);
  return (
    <div
      className={`${styles.card} ${show && styles?.active} flex column gap15 `}
    >
      <VideoPlayer
        allowChangeSound={true}
        thumbnail={val?.thumbnail?.url}
        muted={true}
        autoPlay={false}
        //canPlayAndPause
        playOnHover
        url={val?.video?.url}
        hideThumbnailOnClick
        resetOnMouseLeave={true}
        hideThumbnailOnLoaded={false}
        className={styles.Video}
        link={val?.link}
      />

      <div className={`${styles.cardBottom} just-sb flex `}>
        <h1 className={styles.title}>{customText(val?.title, 40)}</h1>
      </div>
    </div>
  );
};

export default Card;

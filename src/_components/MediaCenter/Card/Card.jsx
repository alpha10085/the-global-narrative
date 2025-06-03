import YouTubeEmbed from "@/_components/Shared/YoutubeEmded/YoutubeEmded";
import styles from "./Card.module.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useEffect, useState } from "react";
import { customText } from "@/utils/text";

const Card = ({ val, index }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), index * 150); // Change 5000 to your desired delay in milliseconds.
  }, []);
  const channelPicture =
    "https://yt3.ggpht.com/7JjfCHjHReIEZXW8ksufTYjKXChdx-Gp_iQJIWOD72xqF3YdyJsWqAPtCPfacWrMgabWpBvODBw=s88-c-k-c0x00ffffff-no-rj";

  return (
    <div
      className={`${styles.card} ${show && styles?.active} flex column gap15 `}
    >
      <div className={styles.cardTop}>
        <YouTubeEmbed
          channelPicture={channelPicture}
          title={val?.title}
          className={styles.YouTubeEmbed}
          link={val?.link}
        />
      </div>
      <div className={`${styles.cardBottom} just-sb flex `}>
        <h1 className={styles.title}>{customText(val?.title,60)}</h1>
        <ArrowOutwardIcon />
      </div>
    </div>
  );
};

export default Card;

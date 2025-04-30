import Img from "@/components/Shared/img/Img";
import VideoPlayer from "@/components/Shared/Video/Video";
import styles from "./Media.module.css";

const Media = ({ className = "", media = {} }) => {
  const mediaUrl = media?.url || null;
  const type = mediaUrl && mediaUrl.endsWith(".mp4") ? "video" : "image";

  return (
    <div className={`${styles.conatainer}  ${className} `}>
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

export default Media;

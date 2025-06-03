import styles from "./Marquee.module.css";
import Img from "@/Components/Shared/img/Img";
const MarqueeLogos = ({ data = [], single = true }) => {
  // Calculate how many logos are needed to make the total at least 16
  const logos = Array.isArray(data) ? data : [];
  const requiredLogos = 20;
  const logosCount = logos?.length;
  let allLogos = [...logos];

  // Repeat logos only if data has content, to avoid infinite loop
  if (logosCount > 0) {
    while (allLogos?.length < requiredLogos) {
      allLogos?.push(...logos);
    }
  } else {
    return;
  }

  const renderLogos = allLogos?.map((val, index) => (
    <div
      key={`${val?._id}-${index}`} // Use a more unique key if available
    >
      <Img
        withEffect
        disableSkeleton
        url={val?.logo?.url}
        className={`${styles.poster} ${val?.large && styles.large} flex-all-c`}
      />
    </div>
  ));

  return (
    <div className={`flex f-column`}>
      <div className={`${styles.logos} flex`}>
        <div className={`${styles.logosSlide} flex`}>{renderLogos}</div>
        <div className={`${styles.logosSlide} flex`}>{renderLogos}</div>
      </div>
      {!single && (
        <div className={`${styles.logos} flex`}>
          <div className={`${styles.logosSlide2} flex`}>{renderLogos}</div>
          <div className={`${styles.logosSlide2} flex`}>{renderLogos}</div>
        </div>
      )}
    </div>
  );
};

export default MarqueeLogos;

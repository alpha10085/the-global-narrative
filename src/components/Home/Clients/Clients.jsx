import Img from "@/components/Shared/img/Img";
import styles from "./Clients.module.css";

const Clients = ({ data: { logos = [] } = {} }) => {
  // Calculate how many logos are needed to make the total at least 16
  const requiredLogos = 16;
  const allLogos = [...logos];

  // Repeat logos if there are fewer than requiredLogos
  if (allLogos.length < 4) return null;
  while (allLogos.length < requiredLogos) {
    allLogos.push(...logos);
  }

  // Slice the array to ensure the length does not exceed requiredLogos
  const displayedLogos = allLogos.slice(0, requiredLogos);
  return (
    <section className={`${styles.section} `}>
      <div className={`${styles.logos} flex  `}>
        <div className={`${styles.logosSlide} flex  `}>
          {displayedLogos?.map((val, index) => (
            <Img
              disableSkeleton
              key={index}
              url={val?.logo?.url}
              className={`${styles.poster} flex-all-c`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

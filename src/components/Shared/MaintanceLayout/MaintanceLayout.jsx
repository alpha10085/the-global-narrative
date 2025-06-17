import Img from "../img/Img";
import styles from "./MaintanceLayout.module.css";

const MaintanceLayout = () => {
  return (
    <div className={`flex-c gap20 column ${styles.container}`}>
      <Img
        disableSkeleton
        className={styles.poster}
        url="/dashboard/logo-dark.png?"
      />
      <p>
        This site is under maintenance and will be live as soon as possible.
        <br />
        For more details, please contact us at
        <a
          href="https://www.alpha-x.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          AlphaX Team
        </a>
        .
      </p>
    </div>
  );
};

export default MaintanceLayout;

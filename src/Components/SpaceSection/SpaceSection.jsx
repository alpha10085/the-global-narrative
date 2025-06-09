import styles from "./SpaceSection.module.css";

const SpaceSection = ({
  style = {
    background: " ",
    backdropFilter: "",
  },
}) => <div style={style} className={styles.container} />;

export default SpaceSection;

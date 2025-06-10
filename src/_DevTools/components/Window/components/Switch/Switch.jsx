import styles from "./Switch.module.css";
const defualtProps = {
  onClick: () => {},
  label: "",
  isActive: false,
};
const Switch = ({
  firstOption = defualtProps,
  secendOption = defualtProps,
}) => {
  return (
    <div className={styles.projectmode}>
      <h1 className={styles.title}>project mode</h1>
      <div className={`${styles.options} flex al-i-c  gap20`}>
        <div
          onClick={() => firstOption?.onClick?.()}
          className={`${styles.option} ${styles.dev} flex-c ${
            firstOption?.isActive ? styles.active : ""
          } `}
        >
          {firstOption?.label}
        </div>
        <div
          onClick={() => secendOption?.onClick?.()}
          className={`${styles.option} flex-c   ${styles.pro} ${
            secendOption?.isActive ? styles.active : ""
          }`}
        >
          {secendOption?.label}
        </div>
      </div>
    </div>
  );
};

export default Switch;

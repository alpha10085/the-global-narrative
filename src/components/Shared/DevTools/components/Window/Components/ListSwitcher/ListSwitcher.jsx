import styles from "./ListSwitcher.module.css";

const ListSwitcher = ({ children,className="", enabled = false }) => {
  return (
    <div
      className={`${styles.list} ${
        enabled ? "" : `not-allowed ${styles.notallowed}`
      } flex just-sb  wrap   ${className} `}
    >
      {children}
    </div>
  );
};

export default ListSwitcher;

import OptionsControl from "../OptionsControl/OptionsControl";
import styles from "./MainSwitch.module.css";

const MainSwitch = ({
  label = "",
  description = "",
  onChange = () => {},
  defaultValue = false,
  wrapper_className = "",
  label_className = "",
}) => {
  return (
    <div className={styles.mainOption}>
      <OptionsControl
        onChange={onChange}
        label={label}
        description={description}
        defaultValue={defaultValue}
        wrapper_className={wrapper_className}
        label_className={label_className}
      />
    </div>
  );
};

export default MainSwitch;

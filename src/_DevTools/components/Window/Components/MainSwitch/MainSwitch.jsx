import OptionsControl from "../OptionsControl/OptionsControl";
import styles from "./MainSwitch.module.css";

const MainSwitch = ({
  label = "",
  description = "",
  onChange = () => {},
  defaultValue = false,
  wrapper_className = "",
  label_className = "",

  watchDefaultValue = false,
  disabled = false,
}) => {
  return (
    <div className={`${styles.mainOption} ${disabled ? styles.disabled : ""}`}>
      <OptionsControl
        onChange={onChange}
        label={label}
        description={description}
        defaultValue={defaultValue}
        wrapper_className={wrapper_className}
        label_className={label_className}
        watchDefaultValue={watchDefaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default MainSwitch;

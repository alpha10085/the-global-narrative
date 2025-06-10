import AnimatedCheckbox from "@/componentss/Shared/AnimatedCheckbox/AnimatedCheckbox";
import styles from "./OptionsControl.module.css";

const OptionsControl = ({
  label = "",
  description = "",
  onChange = () => {},
  defaultValue = false,
  wrapper_className="",
  label_className = "",
  watchDefaultValue = false,
  disabled = false
}) => {
  return (
    <div className={`${styles.container} flex just-c column ${wrapper_className}`}>
      <AnimatedCheckbox
      watchDefaultValue={watchDefaultValue}
        defaultValue={defaultValue}
        onChange={onChange}
        label={label}
        label_className={label_className}
        disabled={disabled}
      />
      <p>{description}</p>
    </div>
  );
};

export default OptionsControl;

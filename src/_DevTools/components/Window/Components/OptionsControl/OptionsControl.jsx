import AnimatedCheckbox from "@/_components/Shared/AnimatedCheckbox/AnimatedCheckbox";
import styles from "./OptionsControl.module.css";

const OptionsControl = ({
  label = "",
  description = "",
  onChange = () => {},
  defaultValue = false,
  wrapper_className="",
  label_className = ""
}) => {
  return (
    <div className={`${styles.container} flex just-c column ${wrapper_className}`}>
      <AnimatedCheckbox
        defaultValue={defaultValue}
        onChange={onChange}
        label={label}
        label_className={label_className}
      />
      <p>{description}</p>
    </div>
  );
};

export default OptionsControl;

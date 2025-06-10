import styles from "./InputTextModern.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { JoiGetNestedError } from "@/utils/data";

const InputTextModern = ({
  name,
  className,
  placeholder,
  errors,
  showError,
  label,
  watch,
  register,
}) => {
  // const isEmpty = !!watch(name)?.length;
  const errormsg = JoiGetNestedError(errors, name);
  return (
    <div className={`${styles.label} ${className}`}>
      <h1 className={styles.labeltitle}>{label}</h1>
      <input
        className={`${styles.input} ${
          errormsg || showError ? styles.error : ""
        }`}
        // {...register(name)}
        placeholder={placeholder}
        type="text"
      />
      <ErrorMessage message={errormsg} />
    </div>
  );
};

export default InputTextModern;

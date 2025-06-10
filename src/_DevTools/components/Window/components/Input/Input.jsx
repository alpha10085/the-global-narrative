import { useState } from "react";
import styles from "./Input.module.css";

const Input = ({
  disabled = false,
  onError = () => {},
  onChange = () => {},
  validation = () => {},
  label,
  value = "",
  textarea = false, // new prop
}) => {
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    onChange(target?.value);
    const { message = null, valid = true } = validation(target?.value) || {};
    if (!valid) {
      setError(message);
      onError(!valid);
    } else {
      setError(false);
      onError(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>

      {textarea ? (
        <textarea
          disabled={disabled}
          value={value}
          className={`${styles.input} ${disabled ? styles.disabled : ""}`}
          onChange={handleChange}
          style={{
            height: "100px",
          }}
        />
      ) : (
        <input
          type="text"
          disabled={disabled}
          value={value}
          className={`${styles.input} ${disabled ? styles.disabled : ""}`}
          onChange={handleChange}
        />
      )}

      <p
        className={`${styles.errorMasg} ${
          error && styles.show
        } flex al-t-i gap5`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        {error}
      </p>
    </div>
  );
};

export default Input;

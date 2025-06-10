import { useState } from "react";
import styles from "./searchinput.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
export const SearchInput = ({
  onChange = () => {},
  onClear = () => {},
  currentVal = "",
  theme,
  searchKey = "search",
  className = "",
  placeholder = "search",
}) => {
  const [value, setValue] = useState(currentVal);
  const [disable, setDisable] = useState(false);
  const onChangeHandler = ({ target }) => {
    setDisable(false);
    setValue(target.value);
    if (!target.value) onChange(searchKey, "");
  };
  const submit = () => {
    if (disable) return;
    setDisable(true);
    if (value?.trim() === currentVal) return;
    onChange(searchKey, value);
  };
  const close = () => {
    setDisable(false);
    setValue("");
    onClear(searchKey);
  };
  return (
    <div
      className={` ${styles.input} ${theme.bord20} ${theme.background} ${className}  flex al-i-c `}
    >
      <div className="flex-c " onClick={submit}>
        <SearchIcon />
      </div>
      <input
        className={`${theme?.color}`}
        type="text"
        placeholder={placeholder}
        name="search"
        value={value}
        onChange={onChangeHandler}
      />
      {!!value?.length && (
        <span onClick={close} className="flex-c ">
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export default SearchInput;

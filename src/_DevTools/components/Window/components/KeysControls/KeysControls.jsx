import { memo } from "react";
import styles from "./KeysControls.module.css";
import useDynamicState from "@/hooks/useDynamicState";
import CloseIcon from "@mui/icons-material/Close";
import SectionLabel from "../SectionLabel/SectionLabel";
import Input from "../Input/Input";

const KeysControls = ({
  data = [],
  label = null,
  validation = () => {},
  onChange = () => {},
  inputlabel = "add",
  className = "",
}) => {
  const defaultState = {
    input: "",
    error: false,
  };

  const [state, setState] = useDynamicState({
    ...defaultState,
    data: [...new Set(data)].filter(Boolean),
  });

  const handleInputChange = (value) => {
    setState({ input: value });
  };

  const handleDeleteItem = (index) => {
    const updatedData = state.data.filter((_, i) => i !== index);
    onChange([...updatedData]); // force new reference
    setState({
      data: [...updatedData], // also force new reference
    });
  };

  const handleAddItem = () => {
    const newData = [...new Set([...state.data, state.input].filter(Boolean))];
    onChange([...newData]);
    setState({
      data: [...newData],
      input: "",
      error: false,
    });
  };

  return (
    <div className={styles.container}>
      {label && <SectionLabel label={label} />}
      <div className={className}>
        <div
          key={JSON.stringify(state?.data)}
          className={`${styles.list} flex wrap al-i-c`}
        >
          {state?.data?.map((item, i) => (
            <Item
              key={`${item}-${i}`}
              item={item}
              onClick={() => handleDeleteItem(i)}
            />
          ))}
        </div>
        <div className={`${styles.containerAddNew} flex gap20`}>
          <div className={styles.inputText}>
            <Input
              value={state.input}
              validation={(val) => validation(val, state.data)}
              onChange={handleInputChange}
              onError={(error) => setState({ error })}
              label={inputlabel}
            />
          </div>
          <button
            onClick={handleAddItem}
            disabled={!state.input || state.error}
            className={styles.btnSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const Item = ({ item, onClick }) => {
  return (
    <div className={`${styles.item} `}>
      {item}
      <button className={`${styles.btnremove} flex-c`} onClick={onClick}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default memo(KeysControls);

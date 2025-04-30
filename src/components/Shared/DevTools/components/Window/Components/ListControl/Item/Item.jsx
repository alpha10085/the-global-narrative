import { customText } from "@/utils/text";
import styles from "./Item.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import Input from "../../Input/Input";
import CopyableText from "../../CopyableText/CopyableText";
import { delay } from "@/utils/delay";
import useDynamicState from "@/hooks/useDynamicState";
const Item = ({
  onDelete = () => {},
  onChange = () => {},
  itemVal,
  lastElement = false,
  oneItem = false,
  canUpdate = false,
}) => {
  const [windowState, setWindowState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [state, setState] = useDynamicState({
    deleteState: false,
    windowState: false,
    value: itemVal.value,
  });
  const { key } = itemVal;
  const value = state?.value;
  const isPublicKey = key?.startsWith("NEXT_PUBLIC");
  const onChangeValue = (val) =>
    setState({
      value: val,
    });
  return (
    <div
      className={`${styles.item} ${
        oneItem ? styles.oneItem : deleteState ? styles.deleteState : ""
      } ${lastElement && styles.lastElement}`}
    >
      <div className={`${styles.head}  flex al-i-c just-sb gap20`}>
        <div className={`${styles.key} flex column gap10`}>
          <CopyableText
            onCopy={key}
            text={customText(key, 35)}
            className={styles.keyValue}
          />
          <div
            className={`${styles.keyType} ${isPublicKey ? "" : styles.server}`}
          >
            {isPublicKey ? "public" : "server only"}
          </div>
        </div>
        <div className={`${styles.value} flex-c gap10`}>
          {itemVal?.value ? (
            <CopyableText
              onCopy={itemVal?.value}
              text={customText(itemVal?.value, 35)}
              className={styles.value}
            />
          ) : (
            ""
          )}
          <button
            disabled={!canUpdate}
            onClick={() => setWindowState(!windowState)}
            className={`${styles.icon} 
            ${!canUpdate && styles.cantUpdate}
            ${windowState && styles.active} flex-c`}
          >
            <MoreHorizIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.body} ${windowState ? styles.active : ""} `}>
        <div className={`${styles.wrapper}  flex column gap10`}>
          <Input
            onChange={(val) => onChangeValue(val)}
            textarea
            label={"Value"}
            value={value}
          />
          <div className={`${styles.btns} flex just-fe gap15`}>
            <button
              onClick={() => {
                setDeleteState(true);
                delay(400).then(onDelete);
              }}
            >
              <span>Delete</span>
            </button>
            <button
              disabled={value?.length < 3 || value === itemVal?.value}
              onClick={() => onChange(value)}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

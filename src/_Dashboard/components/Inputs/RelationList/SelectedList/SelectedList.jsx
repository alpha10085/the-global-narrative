import { isEmpty } from "lodash";
import styles from "./SelectedList.module.css";
import Link from "@/_components/Shared/Link/Link";
import Img from "@/_components/Shared/img/Img";
import { getNestedProperty } from "@/utils/object";
import { Virtuoso } from "react-virtuoso";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { swapItems } from "../helpers";
const SelectedList = ({
  field,
  theme,
  optionSelected,
  onChange = () => "",
  setOptionSelected,
  active = false,
}) => {
  const { single = true, ref: entryRef = "", imageField } = field;
  if (isEmpty(optionSelected)) return null;
  const callBackForHandleChange = (newVal) => {
    setOptionSelected(newVal);
    onChange(field?.name, newVal);
  };
  const handleCancel = (item) => {
    if (single) {
      onChange(field?.name, null);
      setOptionSelected(null);
    } else {
      let newVal = optionSelected?.filter((val) => val?._id !== item?._id);
      onChange(field?.name, newVal);
      setOptionSelected(newVal);
    }
  };
  const moveUp = (index) =>
    swapItems(
      optionSelected,
      index,
      index === 0 ? optionSelected?.length - 1 : index - 1,
      callBackForHandleChange
    );
  const moveDown = (index) =>
    swapItems(
      optionSelected,
      index,
      index === optionSelected?.length - 1 ? 0 : index + 1,
      callBackForHandleChange
    );

  const CardProps = {
    field,
    imageField,
    moveDown,
    moveUp,
    optionSelected,
    single,
    theme,
    entryRef,
    handleCancel,
  };

  if (single) return <Card val={optionSelected} {...CardProps} />;
  return (
    <Virtuoso
      useWindowScroll
      overscan={900}
      className={`${styles.listOptionsSelected} ${
        active && styles.active
      } flex   column `}
      data={optionSelected}
      itemContent={(index, val) => (
        <Card key={val?._id} index={index} val={val} {...CardProps} />
      )}
    />
  );
};
const voidFunction = () => {};
const Card = ({
  single = true,
  val = {},
  entryRef = null,
  theme = {},
  moveDown = voidFunction,
  moveUp = voidFunction,
  index = 0,
  imageField = null,
  optionSelected = [],
  field = {},
  handleCancel,
}) => {
  return (
    <div className={styles.optionVirtuoso}>
      <div
        className={`${styles.optionSelected} ${theme?.background} ${theme?.bord20}  flex al-i-c just-sb  `}
      >
        <Link
          className={`flex gap10 al-i-c  ${styles.left}`}
          href={`/dashboard/collections/${entryRef}/${val?._id}`}
        >
          {imageField && (
            <Img
              theme={theme.name}
              url={getNestedProperty(val, imageField)?.url}
              className={`${styles.imageField}  ${theme.bord20}`}
            />
          )}
          <h1 className={styles.content}>
            {val ? getNestedProperty(val, field?.displayField) : "..."}
          </h1>
        </Link>
        <div className={`${styles.optionsSelected} flex gap10 al-i-c`}>
          {!single && (
            <>
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`${styles.btnReOrder} ${theme.button} flex-c`}
              >
                <ArrowUpwardIcon />
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={optionSelected?.length === index + 1}
                className={`${styles.btnReOrder} ${theme.button} flex-c`}
              >
                <ArrowDownwardIcon />
              </button>
            </>
          )}

          <span
            onClick={() => handleCancel(val)}
            className={`${styles.btnremove} flex-c`}
          >
            <CloseIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectedList;

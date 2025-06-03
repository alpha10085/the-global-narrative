import FieldManager from "@/_Dashboard/_Components/FieldManger/FieldManger";
import styles from "./Card.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { delay } from "@/utils/time";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Card = ({
  value,
  lastElemnt = false,
  index,
  field,
  formProps,
  onRemove,
  moveUp,
  moveDown,
  translations,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [openList, seyOpenList] = useState(false);
  const { theme, mode, toggleBg = false, watch } = formProps;
  const listRef = useRef(null);
  const getFieldByKey = (obj = {}, key = "") => {
    try {
      // Split the key by '.' and match parts, handling both objects and array indices
      const keys = key.match(/[^.[\]]+/g);

      return keys.reduce((acc, k) => {
        // Return undefined if the path is invalid
        if (acc === undefined) return undefined;

        // Check if the current key is an array index (e.g., [0])
        const indexMatch = k.match(/^\d+$/);
        if (indexMatch) {
          // Convert to integer index and access the array element
          return acc[parseInt(k, 10)];
        }

        // Access the object property for non-index parts
        return acc[k];
      }, obj);
    } catch (error) {
      return undefined;
    }
  };
  const isHasError = !!getFieldByKey(
    formProps?.errors,
    `${field.name}[${index}]`
  );
  const toggleList = async (mode = "") => {
    if (disabled) return;
    if (openForm && mode === "true") return;
    if (isHasError && mode !== "true") return;

    setDisabled(true);
    if (openForm) {
      const elementHeight = listRef.current.scrollHeight; // Get the full height of the content
      // Set an initial height for the collapsing transition
      listRef.current.style.height = `${elementHeight}px`;

      await delay(0); // Custom delay function
      // Start collapsing
      listRef.current.style.height = "0px"; // Collapse to zero height
      listRef.current.style.paddingTop = "0"; // Add padding for the first time
      listRef.current.style.paddingBottom = "0"; // Add padding for the first time

      // Wait for the animation to finish (500ms)
      await delay(450); // Custom delay function
      setOpenForm(false); // Close after animation ends
      // Reset the transition to avoid it being applied on next render

      if (openList) seyOpenList(false);
    } else {
      // Prepare the element for expansion
      listRef.current.style.height = "auto";
      listRef.current.style.paddingTop = "20px"; // Add padding for the first time
      listRef.current.style.paddingBottom = "20px"; // Add padding for the first time
      setOpenForm(true);
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (isHasError) toggleList("true");
  }, [isHasError]);
  const ThemeBg = formProps?.toggleBg ? theme.background : theme.bg200;

  return (
    <div
      className={`${styles.card}  ${openForm && styles.open} ${
        theme.bord20
      }   ${ThemeBg} showSmooth flex column  wrap`}
    >
      <div
        className={`${styles.header}  ${theme.bord20} ${
          isHasError && theme.containerDanger20
        }   flex gap10 just-sb al-i-c`}
      >
        <div
          onClick={toggleList}
          className={`flex al-i-c gap10  ${styles.headerLeft} ${
            openForm && styles.open
          } `}
        >
          <ArrowForwardIosIcon />

          <h1
            className={`${styles.headerTitle} ${
              isHasError && theme.textdanger10
            }`}
          >
            {index + 1} {field.label}
          </h1>
        </div>
        {!openList && (
          <button
            onClick={() => seyOpenList(true)}
            className={`${styles.btnReOrder} showSmooth ${styles.btnoptions} ${theme.button} flex-c`}
          >
            <MoreVertIcon />
          </button>
        )}
        <div
          onClick={() => seyOpenList(false)}
          className={`flex gap15 ${styles.buttonList} showSmooth  ${
            openList && styles.open
          } `}
        >
          <button
            onClick={moveUp}
            disabled={index === 0}
            className={`${styles.btnReOrder} ${theme.button} flex-c`}
          >
            <ArrowUpwardIcon />
          </button>

          <button
            onClick={moveDown}
            disabled={lastElemnt}
            className={`${styles.btnReOrder} ${theme.button} flex-c`}
          >
            <ArrowDownwardIcon />
          </button>
          <div
            onClick={() => onRemove(value?._id, `${field?.name}[${index}]`)}
            className={`${styles.btnDelete} ${theme.button} flex-c`}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div
        ref={listRef}
        className={`flex   wrap ${styles.list} ${openForm && styles.open} ${
          theme.scrollBar
        }`}
      >
        {openForm &&
          field?.fields?.map((nestedField, nestedIndex) => {
            const nestedFieldName = `${field.name}[${index}].${nestedField.name}`;
            return (
              <FieldManager
                key={`${field?.name}_${value?._id}_${index}_${nestedIndex}`}
                field={{
                  ...nestedField,
                  ...(field?.type === "textarea" ? { fullSize: true } : {}),
                  name: nestedFieldName,
                  originalName: nestedField.originalName || nestedField.name,
                  label: translations?.inputs?.[nestedField?.label],
                  placeholder:
                    translations?.inputs?.[`${nestedField?.label}_ph`],
                  parentlabel: field?.label,
                }}
                formProps={{
                  ...formProps,
                  index,
                  parentType: "array",
                  parentKey: field?.name,
                  toggleBg: !toggleBg,
                  _id: value?._id,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(Card, (prevProps, nextProps) => {
  return (
    isEqual(prevProps.errors, nextProps.errors) && // Compare the errors using deep equality
    prevProps?.value?._id === nextProps?.value?._id &&
    prevProps?.field?.name === nextProps?.field?.name && // Compare field names
    prevProps?.index === nextProps?.index && // Compare indexes
    prevProps?.lastElemnt === nextProps?.lastElemnt // Compare lastElemnt
  );
});

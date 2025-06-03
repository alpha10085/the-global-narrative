"use client";
import styles from "./ArrayWrapper.module.css";
import Card from "./Components/Card/Card";
import { memo, useState } from "react";
import { isEqual } from "lodash";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import ObjectId from "bson-objectid";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";

const ArrayWrapper = (props) => {
  const {
    currentValue = [],
    theme,
    onChange,
    field,
    error,
    watch,
    clearErrors,
    toggleBg,
    trigger,
    errors,
    itemError,
    removeTranslation,
  } = props;
  const { name = "", displayField = "", label = "", max = 5 } = field || {};
  const [data, setData] = useState(currentValue);
  const reachedMax = data?.length >= max;
  const ThemeBg = toggleBg ? theme.background : theme.bg200;

  const getUpdatedArray = () => [...(watch(name) || [])];

  const handleAddnew = () => {
    if (reachedMax) return;
    const arr = getUpdatedArray();
    const newArray = [...arr, { _id: new ObjectId().toString() }];
    setData(newArray);
    onChange(name, newArray, true, true);
    if (!arr?.length) clearErrors(name);
  };

  const handleRemove = (id, index) => {
    const arr = getUpdatedArray();
    const targetItem = arr?.[index] || {};
    if (targetItem?.translation) {
      targetItem?.translation.forEach((tVal) => {
        if (tVal?._id) {
          removeTranslation(tVal._id);
        }
      });
    }
    const newArray = arr?.filter((item) => item?._id !== id);
    setData(newArray);
    onChange(name, newArray);
    trigger(field.name);
  };

  const swapItems = (index, newIndex) => {
    const arr = getUpdatedArray();
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setData(arr);
    onChange(name, arr);
    trigger(field.name);
  };
  const moveUp = (index) =>
    swapItems(index, index === 0 ? data?.length - 1 : index - 1);
  const moveDown = (index) =>
    swapItems(index, index === data?.length - 1 ? 0 : index + 1);

  const translations = useTranslationsDashboard([
    {
      key: "inputs",
      schema: field,
    },
  ]);

  return (
    <div
      id={handleReplaceDot(name)}
      className={`w-100 flex gap5 column ${styles.ArrayWrapper}`}
    >
      <div className={`flex ml-5 al-i-c gap5 ${styles.label}`}>
        <h1 className="ml10">{label}</h1>
        {data?.length > 0 && (
          <p className="showSmooth">
            ({data?.length} item{data?.length > 1 ? "s" : ""})
          </p>
        )}
      </div>
      <ErrorMessage theme={theme} message={error} label={label} />
      <div
        className={`${styles.list} ${ThemeBg} flex column ${theme.bord20}`}
      >
        {data?.map((value, index) => (
          <Card
            key={value._id}
            field={field}
            errors={itemError?.[index]}
            formProps={props}
            value={value}
            index={index}
            length={data?.length}
            displayField={displayField}
            clearErrors={clearErrors}
            lastElemnt={index + 1 === data?.length}
            onRemove={() => handleRemove(value?._id, index)}
            moveUp={() => moveUp(index)}
            moveDown={() => moveDown(index)}
            translations={translations}
          />
        ))}
        <div
          onClick={handleAddnew}
          className={`flex-c mb10 ${theme.bord20} ${
            !reachedMax && "clickable"
          } column gap10 ${styles.emptylayout} ${ThemeBg}`}
        >
          {reachedMax ? `Max Is ${max}` : <LibraryAddIcon />}
        </div>
      </div>
    </div>
  );
};

export default memo(ArrayWrapper, (prevProps, nextProps) => {
  return (
    prevProps.field.name === nextProps.field.name &&
    isEqual(prevProps.itemError, nextProps.itemError) &&
    isEqual(prevProps.error, nextProps.error)
  );
});

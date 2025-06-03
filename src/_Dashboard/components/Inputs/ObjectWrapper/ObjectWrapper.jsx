import { memo } from "react";
import { isEqual } from "lodash";
import styles from "./ObjectWrapper.module.css";
import ErrorMessage from "@/_Dashboard/Components/ErrorMessage/ErrorMessage";
import FieldManager from "../../FieldManger/FieldManger";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";

const ObjectWrapper = (props = {}) => {
  let { theme, field, error, mode, clearErrors, watch, translations } = props;
 
  const { fields = [], label = "" } = field;

  const _id = watch(field?.name)?._id;
  return (
    <div id={handleReplaceDot(field?.name)} className={`${styles.label}   flex column`}>
      <h1 className={`${theme?.color} ${styles.title}`}>{label}</h1>
      <ErrorMessage theme={theme} className={styles.errormsg} message={error} label={label}/>
      <div
        className={`flex wrap  ${styles.objectWrapper} ${theme?.bg200} ${theme?.bord20}`}
      >
        {fields?.map((nestedField, nestedIndex) => {
          const nestedFieldName = `${field.name}.${nestedField.name}`;

          return (
            <FieldManager
              key={nestedFieldName}
              field={{
                ...nestedField,
                name: nestedFieldName,
                originalName: nestedField.originalName || nestedField.name,
                parentFieldName: nestedField.parentFieldName || field.name,
                label: translations?.inputs?.[nestedField?.label],
                placeholder: translations?.inputs?.[`${nestedField?.label}_ph`],
                parentlabel: field?.label,
              }}
              formProps={{
                ...props,
                _id,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(ObjectWrapper, (prevProps, nextProps) => {
  return (
    prevProps.field.name === nextProps.field.name &&
    prevProps.mode === nextProps.mode &&
    isEqual(prevProps.itemError, nextProps.itemError)
  );
});

import React, { useMemo } from "react";
import TextInput from "@/_Dashboard/components/Inputs/textInput/textInput";
import DropDown from "@/_Dashboard/components/Inputs/dropdown/Dropdown";
import RelationList from "@/_Dashboard/components/Inputs/RelationList/RelationList";
import TextArea from "@/_Dashboard/components/Inputs/TextArea/TextArea";
import ArrayWrapper from "../Inputs/ArrayWrapper/ArrayWrapper";
import BooleanInput from "../Inputs/booleanInput/BooleanInput";
import NumberInput from "../Inputs/NumberInput/NumberInput";
import ColorPicker from "../Inputs/ColorPicker/ColorPicker";
import DateInput from "../Inputs/DateInput/DateInput";
import { JoiGetNestedError } from "@/utils/data";
import ObjectWrapper from "../Inputs/ObjectWrapper/ObjectWrapper";
import { dynamicForm_config } from "@/_Dashboard/configuration/CustomComponents/ComponentManger";
import Slider from "../Inputs/Slider/Slider";
import { getNestedValue } from "@/_Dashboard/utils/JoiHandlers";
import TranslateField from "../Inputs/TranslateField/TranslateField";
import dynamicZone_config from "@/_Dashboard/configuration/dynamicZone/config";

const FieldManager = ({ field = {}, formProps = {} }) => {
  const {
    watch = () => {},
    onChange = () => {},
    className = "",
    errors = {},
    theme = {},
    type = "collections",
    endpoint,
    clearErrors,
    mode,
  } = formProps;

  if (field.type === "dynamicZone") {
    let getField = dynamicZone_config?.[field.key];
    if (!getField) {
      console.log(
        `❌ No configuration found for dynamic zone field: ${field.key}`
      );
      return null;
    }
    field = getField;
  }


  let error = JoiGetNestedError(errors, field?.name);
  error = error ? `${field.label} ${error}` : null;
  const commonProps = useMemo(
    () => ({
      ...formProps,
      theme,
      onChange,
      field,
      className,
      error,
      mode,
      type,
      watch,
      clearErrors,
      itemError: getNestedValue(errors, field?.name),
      endpoint,
    }),
    [
      formProps,
      theme,
      onChange,
      field,
      className,
      error,
      mode,
      type,
      watch,
      clearErrors,
      errors,
      endpoint,
    ]
  );

  // Use useMemo to cache the component mapping
  const Component = useMemo(() => {
    const allOptions = {
      text: TextInput,
      password: TextInput,
      number: NumberInput,
      boolean: BooleanInput,
      color: ColorPicker,
      enum: DropDown,
      relation: RelationList,
      object: ObjectWrapper,
      textarea: TextArea,
      media: Slider,
      array: ArrayWrapper,
      date: DateInput,
      translate: TranslateField,
      ...dynamicForm_config,
      default: () => null,
    };
    return allOptions[field?.type] || allOptions.default;
  }, [field?.type, field?.name]);

  return (
    <Component
      key={field.name}
      {...commonProps}
      currentValue={watch(field?.name)}
    />
  );
};

export default React.memo(FieldManager);

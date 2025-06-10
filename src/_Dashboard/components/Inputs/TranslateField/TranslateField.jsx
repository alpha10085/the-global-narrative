import { useMemo } from "react";
import TextInput from "../textInput/textInput";
import TextArea from "../TextArea/TextArea";
function getBaseField(input) {
  // Initialize the result object
  const result = {
    fieldName: "", // The base fieldName
    path: "", // The root path or parent path
    localePath: "", // The locale-specific translation path
  };

  // Check if the input contains dots or square brackets
  if (/[\.\[]/.test(input)) {
    // Match the input to extract the parent path, fieldName, and array index
    const match = input.match(/^(.*?)\.?([^.\[\]]+)?(?:\[.*?\])?$/);

    if (match) {
      const [_, parentPath, fieldName] = match;

      result.fieldName = fieldName || parentPath; // Use fieldName if available, otherwise parentPath
      result.path = parentPath.includes("[")
        ? parentPath.split("[")[0]
        : parentPath; // Base path

      // Construct localePath dynamically
      const arrayMatch = parentPath.match(/\[.*?\]/); // Check if there's an array index
      const arrayPart = arrayMatch ? arrayMatch[0] : ""; // Include array index if present
      result.localePath = `${result.path}${arrayPart}.translation`; // Add translation after the array index
    }
  } else {
    // Handle single-word inputs like "title"
    result.fieldName = input;
    result.path = "root";
    result.localePath = "translation";
  }

  return result;
}

const TranslateField = (props) => {
  const { onChange, field, _id, language, watch } = props;
  const { fieldName, localePath, path } = useMemo(
    () => getBaseField(field?.name),
    [field]
  );
  const handleChange = (dynamicformKey = "", value) => {
    let currentTranslations = watch(localePath) || [];
    // Find existing translation matching the `key` and `path`
    let target = currentTranslations.find(
      (tr) => tr.key === fieldName && tr.path === path
    );
    if (target) {
      // If translation exists, update its value
      target.value = value;
    } else {
      // If translation doesn't exist, add a new translation
      currentTranslations.push({
        ref: _id,
        language,
        value,
        key: fieldName,
        path,
      });
    }
    // Trigger the onChange with the updated translations array
    onChange(localePath, [...currentTranslations]);
    onChange(dynamicformKey, value);
  };

  const updatedProps = {
    ...props,
    onChange: handleChange,
  };

  const Component = field?.fullSize ? TextArea : TextInput;
  return <Component {...updatedProps} />;
};

export default TranslateField;

//  handle logic ref !

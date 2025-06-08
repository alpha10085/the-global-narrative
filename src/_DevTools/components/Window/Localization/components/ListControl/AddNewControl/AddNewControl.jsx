import styles from "./AddNewControl.module.css";
import useDynamicState from "@/hooks/useDynamicState";
import Input from "@/_DevTools/components/Window/Components/Input/Input";
import MainSwitch from "@/_DevTools/components/Window/Components/MainSwitch/MainSwitch";
import { validateLocaleCode, validateLocaleLabel } from "../LocaleControl/helpers";

const AddNewControl = ({
  labelsList = [],
  codesList = [],
  onSubmit = () => {},
}) => {
  const [state, setState] = useDynamicState({
    value: {
      key: "",
      label: "",
      isDefualtValue: false,
    },
    error: null,
  });
  const handleChange = (k, v) => {
    setState({
      value: {
        ...state?.value,
        [k]: v,
      },
    });
  };
  const onError = (err) =>
    setState({
      error: err,
    });

  const onSave = () => {
    onSubmit({ ...state?.value });
    setState({
      value: {
        isDefualtValue: false,
        key: "",
        label: "",
      },
    });
  };
  const disabled = state?.error;

  return (
    <div className={styles.container}>
      <h1 className={`${styles.label} flex al-i-c gap5`}>Add new locale</h1>
      <div className={`${styles.valuesControl} flex column gap10`}>
        <div className={`${styles.inputs} flex gap10`}>
          <Input
            onError={onError}
            onChange={(val) => handleChange("key", val)}
            label={"country code"}
            value={state?.value?.key}
            validation={(args) => validateLocaleCode(args, codesList)}
          />
          <Input
            onError={onError}
            onChange={(val) => handleChange("label", val)}
            validation={(args) => validateLocaleLabel(args, labelsList)}
            label={"Label"}
            value={state?.value?.label}
          />
        </div>
        <MainSwitch
          watchDefaultValue
          onChange={(val) => handleChange("isDefualtValue", val)}
          disabled={disabled}
          key={"defaultLocale"}
          label={"mark as default Locale"}
          description={"This will set this locale as default Locale"}
          defaultValue={state?.value?.isDefualtValue}
        />
        <div className={`${styles.btnList} flex gap10 just-sb`}>
          <button
            disabled={disabled}
            onClick={onSave}
            className={styles.btnSave}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewControl;

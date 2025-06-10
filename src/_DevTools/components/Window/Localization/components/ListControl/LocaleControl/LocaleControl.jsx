import useDynamicState from "@/hooks/useDynamicState";
import styles from "./LocaleControl.module.css";
import Input from "@/_DevTools/components/Window/components/Input/Input";
import SyncIcon from "@mui/icons-material/Sync";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MainSwitch from "@/_DevTools/components/Window/components/MainSwitch/MainSwitch";
import { isEqual } from "lodash";
import { validateLocaleCode, validateLocaleLabel } from "./helpers";
import { reWatchLocale } from "@/lib/tools";
import Spinner from "@/components/Shared/Spinner/Spinner";
export const removeStringFromArray = (arr, str) => {
  return arr.filter((item) => item.toLowerCase() !== str.toLowerCase());
};
const LocaleControl = ({
  isDefaultLocale = false,
  onUpdate,
  onDelete,
  value = {},
  index = 1,
  onSelectAsDefualt = () => {},
  labelsList = [],
  codesList = [],
}) => {
  const [state, setState] = useDynamicState({
    value,
    prevValue: value,
    error: null,
    isLoading: false,
  });
  const handleChange = (k, v) => {
    setState({
      value: {
        ...state?.value,
        [k]: v,
      },
    });
  };
  const onSave = () => {};
  const onError = (err) =>
    setState({
      error: err,
    });

  const oneRewatch = async () => {
    try {
      setState({
        isLoading: true,
      });
      await reWatchLocale(value?.key);
    } catch (error) {
      // call toast.error
    } finally {
      setState({
        isLoading: false,
      });
    }
  };
  const disabled =
    isEqual(state?.value, value) || state?.error || state?.isLoading;

  return (
    <div className={styles.container}>
      <h1 className={`${styles.label} flex al-i-c gap5`}>
        <span>{index < 10 ? `0${index}` : index}</span>
        <span>-</span>
        <span>{state?.value?.label}</span>
      </h1>
      <div className={`${styles.valuesControl} flex column gap10`}>
        <div className={`${styles.inputs} flex gap10`}>
          <Input
            onError={onError}
            onChange={(val) => handleChange("key", val)}
            label={"country code"}
            value={state?.value?.key}
            validation={(args) =>
              validateLocaleCode(
                args,
                removeStringFromArray(codesList, value?.key)
              )
            }
          />
          <Input
            onError={onError}
            onChange={(val) => handleChange("label", val)}
            validation={(args) =>
              validateLocaleLabel(
                args,
                removeStringFromArray(labelsList, value?.label)
              )
            }
            label={"Label"}
            value={state?.value?.label}
          />
        </div>
        <MainSwitch
          watchDefaultValue
          onChange={onSelectAsDefualt}
          disabled={isDefaultLocale}
          key={"defaultLocale"}
          label={"mark as default Locale"}
          description={"This will set this locale as default Locale"}
          defaultValue={isDefaultLocale}
        />
        <div className={`${styles.btnList} flex gap10 just-sb`}>
          <button
            disabled={disabled}
            onClick={() => onUpdate(state?.value)}
            className={styles.btnSave}
          >
            Save
          </button>
          {!isDefaultLocale && (
            <>
              {" "}
              <button
                disabled={state?.isLoading}
                onClick={oneRewatch}
                className={`${styles.btnSync} flex-c`}
              >
                {state.isLoading ? (
                  <Spinner theme={"dark"} size={15} />
                ) : (
                  <span className={`${styles.svg} flex-c`}>
                    <SyncIcon />
                  </span>
                )}
              </button>
              <button
                disabled={state?.isLoading}
                onClick={onDelete}
                className={styles.btnRemove}
              >
                <span className={`${styles.svg} flex-c`}>
                  <RemoveCircleOutlineIcon />
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocaleControl;

import OptionsControl from "../Components/OptionsControl/OptionsControl";
import styles from "./styles.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import SectionLabel from "../Components/SectionLabel/SectionLabel";
import ListSwitcher from "../Components/ListSwitcher/ListSwitcher";
import MainSwitch from "../components/MainSwitch/MainSwitch";
import Loading from "../Loading/Loading";

const options = [
  {
    key: "log",
    label: "informations",
    description: "this will Log all information",
    defaultValue: false,
  },
  {
    key: "warn",
    label: "warnings",
    description: "this will Log all warnings",
    defaultValue: false,
  },
  {
    key: "error",
    label: "Error",
    description: "this will Log all errors",
    defaultValue: false,
  },
];

const ConsoleTools = () => {
  const default_storageData = {
    ...Object?.fromEntries(
      options?.map(({ key, defaultValue = false }) => [key, defaultValue])
    ),
    enabled: false,
  };

  const {
    createOrUpdate,
    data = {},
    isLoading,
  } = useLocalStorage("dev-tools-console");

  const state = data ?? default_storageData;
  const onChange = (key, value) => {
    createOrUpdate({
      ...state,
      [key]: value,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className={`${styles.container} showSmooth`}>
      <MainSwitch
        onChange={(newVal) => onChange("enabled", newVal)}
        key={"enabled"}
        label={"enable console"}
        description={"This will create a warn file"}
        defaultValue={state?.enabled}
      />
      <ListSwitcher enabled={state?.enabled}>
        <SectionLabel />
        <ListSwitcher className={styles.list} enabled>
          {options?.map(({ key, label, description, defaultValue = false }) => (
            <OptionsControl
              onChange={(newVal) => onChange(key, newVal)}
              key={key}
              label={label}
              description={description}
              defaultValue={state[key] || defaultValue}
              label_className={`${styles[key]} ${styles.label}`}
            />
          ))}
        </ListSwitcher>
      </ListSwitcher>
    </div>
  );
};

export default ConsoleTools;

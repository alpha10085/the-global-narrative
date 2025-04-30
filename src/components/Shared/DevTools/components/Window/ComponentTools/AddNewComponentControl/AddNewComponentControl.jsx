import useDynamicState from "@/hooks/useDynamicState";
import styles from "./AddNewComponentControl.module.css";
import Input from "../../Components/Input/Input";
import { useMemo } from "react";
import AsyncButton from "@/components/shared/AsyncButton/AsyncButton";

import { createComponent } from "@/lib/tools";
import { validateComponentName } from "./helpers";
import OptionsControl from "../../Components/OptionsControl/OptionsControl";

const options = [
  {
    key: "styles",
    label: "styles file",
    description: "This will create a styles file",
    defaultValue: true,
  },

  {
    key: "helpers",
    label: "helper file",
    description: "This will create a helper.js file",
  },
  {
    key: "icons",
    label: "icons file",
    description: "This will create a icons.js file",
  },
];
const AddNewComponentControl = ({ path_children, onFinish, path }) => {
  const [state, setState] = useDynamicState({
    name: "",
    error: "",
    ...Object.fromEntries(
      options.map(({ key, defaultValue = false }) => [key, defaultValue])
    ),
  });

  const { name, error, loading } = state;
  const onChange = (value) => setState({ name: value });
  const onError = (val) => setState({ error: val });

  const usedList = useMemo(
    () => path_children?.map((val) => val?.name),
    [path_children]
  );
  const handleSubmit = async () => {
    setState({
      loading: true,
    });
    try {
      const res = await createComponent({
        name: state?.name,
        ...Object.fromEntries(
          options.map(({ key }) => [key, state[key] || false])
        ),
        path: path?.split("/").filter(Boolean),
      });

      onFinish({
        name: state?.name,
        children: [],
        type: "folder",
        new: true,
      });
    } catch (error) {
    } finally {
      setState({
        loading: false,
      });
    }
  };

  return (
    <div className={`${styles.container} flex just-sb wrap gap10`}>
      <Input
        disabled={loading}
        onError={onError}
        usedList={usedList}
        onChange={onChange}
        validation={(args) => validateComponentName(args, usedList)}
        label={"Component Name"}
        value={state?.name}
      />
      <div className={`${styles.List} flex just-sb wrap gap10 pl10 `}>
        {options?.map(({ key, label, description, defaultValue = false }) => (
          <OptionsControl
            onChange={(newVal) => setState({ [key]: newVal })}
            key={key}
            label={label}
            description={description}
            defaultValue={defaultValue}
          />
        ))}
      </div>
      <AsyncButton
        disabled={name?.length < 3 || error}
        className={styles.submitBtn}
        onClick={handleSubmit}
        loading={loading}
        text="create "
        spinnerColor="white"
        onLoading=" "
      />
    </div>
  );
};

export default AddNewComponentControl;

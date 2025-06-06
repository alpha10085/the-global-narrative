import useDynamicState from "@/hooks/useDynamicState";
import styles from "./ListControl.module.css";

import Item from "./Item/Item";
import { isEqual } from "lodash";
import Input from "../Input/Input";
import {
  validateVariable,
  validateVariableName,
  validateVariableValue,
} from "./helpers";
import { updateEnvironment } from "@/lib/tools";

const blockUpdatekeys = ["NEXT_PUBLIC_MODE"];
const ListControl = ({className ="", data = {} }) => {
  const default_addNewVal = {
    key: "",
    value: "",
  };

  const [state, setState] = useDynamicState({
    data,
    oldData: data,
    addNewVal: default_addNewVal,
    loading: false,
  });

  const onChange = (key, value) => {
    const newVal = {
      ...state?.data,
      [key]: value,
    };
    setState({
      data: newVal,
    });
    onSubmit(newVal);
  };
  const handleAddNewVariable = () => {
    const newVal = {
      ...state?.data,
      [state?.addNewVal?.key]: state?.addNewVal?.value,
    };
    setState({
      data: newVal,
      addNewVal: default_addNewVal,
    });
    onSubmit(newVal);
  };
  const onDelete = (key) => {
    const updatedData = JSON.parse(JSON.stringify(state?.data));
    delete updatedData[key];
    const newVal = {
      data: {
        ...updatedData,
      },
    };
    setState(newVal);
    onSubmit(newVal?.data);
  };
  const onSubmit = async (formData) => {
    try {
      setState({ loading: true });
      await updateEnvironment(formData);
      setState({
        loading: false,

        oldData: formData,
      });
    } catch (error) {
    } finally {
      setState({ loading: false });
    }
  };

  const isHasChanges = isEqual(state?.data, state?.oldData);
  const dataAsArray = Object.entries(state?.data);
  return (
    <div className={`${styles.container} ${className} flex column w-100 `}>
      <div className={`${styles.list} flex column`}>
        {dataAsArray?.map(([key, value], index) => (
          <Item
            canUpdate={!blockUpdatekeys?.includes(key)}
            onChange={(val) => onChange(key, val)}
            itemVal={{
              key,
              value,
            }}
            oneItem={dataAsArray?.length === 1}
            key={key}
            onDelete={() => onDelete(key)}
            lastElement={dataAsArray?.length === index + 1}
          />
        ))}
      </div>
      <h1 className={styles.containerAddNewLabel}>Add New Variable</h1>
      <div className={`${styles.containerAddNew} flex  column gap10`}>
        <Input
          canUpdate={blockUpdatekeys}
          onChange={(val) =>
            setState({
              addNewVal: {
                ...state?.addNewVal,
                key: val,
              },
            })
          }
          label={"Name"}
          validation={(val) => validateVariableName(val, state?.data)}
          value={state?.addNewVal?.key}
        />
        <Input
          onChange={(val) =>
            setState({
              addNewVal: {
                ...state?.addNewVal,
                value: val,
              },
            })
          }
          validation={validateVariableValue}
          textarea
          label={"Value"}
          value={state?.addNewVal?.value}
        />
        <div className="flex just-c">
          <button
            disabled={!validateVariable(state)}
            className={styles.buttonSave}
            onClick={handleAddNewVariable}
          >
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListControl;

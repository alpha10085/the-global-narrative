import useDynamicState from "@/hooks/useDynamicState";
import styles from "./ListControl.module.css";
import config from "@/i18n/config";
import LocaleControl from "./LocaleControl/LocaleControl";
import {
  createNewLocale,
  deleteLocale,
  updateDefaultLocale,
  updateLocale as updateLocaleApi,
} from "@/lib/tools";
import AddNewControl from "./AddNewControl/AddNewControl";

const extractUsedList = (data = []) => {
  const codesList = [];
  const labelsList = [];

  data.forEach((val) => {
    codesList.push(val?.key);
    labelsList.push(val?.label);
  });
  return { codesList, labelsList };
};
const ListControl = () => {
  const [state, setState] = useDynamicState({
    locals: config.getlanguagesMap(),
    defaultLocale: config.defaultLocale,
  });

  const handleAddNewLocale = async (newData = {}) => {
    const { key, label } = newData;
    const isExistsBefore = state.locals.find((val) => val?.key === key);
    if (!isExistsBefore) {
      setState({
        locals: [...state.locals, { key, label }],
      });
      try {
        await createNewLocale(newData);
      } catch (error) {
      
      }
      // handle call api to save the action
    }
  };

  const handleRemoveLocale = async (key) => {
    const newVal = state.locals.filter((val) => val?.key !== key);
    setState({
      locals: newVal,
    });

    await deleteLocale(key);
    // handle call api to save the action
  };

  const updateLocale = async (ind, newVal = {}) => {
    const newValLocales = state?.locals?.map((val, i) => {
      if (i === ind) return newVal;
      return val;
    });

    setState({
      locals: newValLocales,
    });
    const prevKey = state?.locals?.[ind]?.key;
    await updateLocaleApi(prevKey, newVal);
  };

  const handleChangeDefaultLocale = async (newVal) => {
    setState({
      defaultLocale: newVal,
    });

    await updateDefaultLocale(newVal);
    // handle call api
  };

  const { codesList, labelsList } = extractUsedList(state?.locals);
  return (
    <div className={`${styles.container} w-100`}>
      <div className={`${styles.list} flex gap10 wrap`}>
        {state?.locals?.map((value, index) => (
          <LocaleControl
            onUpdate={(newval) => updateLocale(index, newval)}
            onDelete={() => handleRemoveLocale(value?.key)}
            key={value?.key}
            value={value}
            index={index + 1}
            onSelectAsDefualt={() => handleChangeDefaultLocale(value?.key)}
            isDefaultLocale={state?.defaultLocale === value?.key}
            codesList={codesList}
            labelsList={labelsList}
          />
        ))}
      </div>
      <AddNewControl
        onSubmit={handleAddNewLocale}
        codesList={codesList}
        labelsList={labelsList}
      />
    </div>
  );
};

export default ListControl;

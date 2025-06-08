import useDynamicState from "@/hooks/useDynamicState";
import styles from "./ListControl.module.css";
import config from "@/i18n/config";
import { stat } from "fs-extra";
import LocaleControl from "./LocaleControl/LocaleControl";
import {
  deleteLocale,
  updateDefaultLocale,
  updateLocale as updateLocaleApi,
} from "@/lib/tools";

const ListControl = () => {
  const [state, setState] = useDynamicState({
    locals: config.getlanguagesMap(),
    defaultLocale: config.defaultLocale,
    newLocale: null,
  });

  const handleAddNewLocale = () => {
    const { key, label } = state?.newLocale;
    const isExistsBefore = state.locals.find((val) => val?.key === key);
    if (!isExistsBefore) {
      setState({
        locals: [...state.locals, { key, label }],
        newLocale: null,
      });

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

  const handleOnChangeForAddNewLocale = (key, val) => {
    setState({
      newLocale: {
        ...state.newLocale,
        [key]: val,
      },
    });
  };
  const handleChangeDefaultLocale = async (newVal) => {
    setState({
      defaultLocale: newVal,
    });

    await updateDefaultLocale(newVal);
    // handle call api
  };

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
            codesList={state?.locals?.map((val) => val?.key)}
            labelsList={state?.locals?.map((val) => val?.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListControl;

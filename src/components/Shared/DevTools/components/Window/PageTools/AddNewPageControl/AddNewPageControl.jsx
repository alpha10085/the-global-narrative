import useDynamicState from "@/hooks/useDynamicState";
import styles from "./AddNewPageControl.module.css";
import OptionsControl from "../../Components/OptionsControl/OptionsControl";
import { useMemo } from "react";
import ComponentName from "./ComponentName/ComponentName";
import AsyncButton from "@/components/shared/AsyncButton/AsyncButton";
import { createPage } from "@/lib/tools";
import PageStrategy from "./PageStrategy/PageStrategy";
import Input from "../../Components/Input/Input";
import { validatePageName } from "../helpers";

const options = [
  { key: "metadata", label: "metadata", description: "Use metadata handlers" },
  {
    key: "getPage",
    label: "api handler",
    description: "This will import getpage",
  },
  {
    key: "ssrFetcher",
    label: "SSR Fetcher",
    description: "This will import ssrFetcher",
  },

  {
    key: "styles",
    label: "Styles file",
    description: "This will create a styles file",
  },
  {
    key: "loadingFile",
    label: "Loading file",
    description: "This will create a loading file",
  },
  {
    key: "notFound",
    label: "NotFound file",
    description: "This will create a NotFound file",
  },
  {
    key: "errorFile",
    label: "Error file",
    description: "This will create an error file",
  },
];

const AddNewPageControl = ({
  parentname = "",
  path_children,
  onFinish,
  path,
}) => {
  const [state, setState] = useDynamicState({
    ...Object.fromEntries(options.map(({ key }) => [key, false])),
    component: false,
    name: "",
    error: false,
    loading: false,
    pageStrategy: null,
  });

  const { name, error, loading, pageStrategy = null } = state;
  const onChange = (value) => setState({ name: value });
  const onError = (val) => setState({ error: val });
  const onChangeComponentName = (value) => setState({ componentname: value });
  const onChangeComponentSwitch = (newVal) => {
    setState({
      component: newVal,
      ...(newVal ? {} : { componentname: undefined }),
    });
  };

  const usedList = useMemo(() => {
    const dynamicPath = path
      .split("/")
      .filter(
        (part, index, self) =>
          /^\[[a-zA-Z0-9_]+\]$/.test(part) && self.indexOf(part) === index
      );
    return [...path_children?.map((val) => val?.name), ...dynamicPath];
  }, [path_children, path]);
  const disableControls = !name || error;
  const handleChnagepageStrategy = (val) => {
    setState({
      pageStrategy: val,
      ...(val === "SSRWrapper"
        ? {
            ssrFetcher: false,
            styles: false,
          }
        : {}),
    });
  };

  const handleSubmit = async () => {
    setState({
      loading: true,
    });
    try {
      const res = await createPage({
        ...state,
        path: path?.split("/").filter(Boolean),
      });

      onFinish({
        name: state?.name,
        children: [],
        page: true,
        type: "folder",
        new:true
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
        validation={(args) => validatePageName(args, usedList, path_children)}
        disabled={loading}
        onError={onError}
        onChange={onChange}
        label={"Page Name"}
        value={state?.name}
      />
      <div
        className={`flex just-sb wrap gap10 ${styles.controls} ${
          !(disableControls || loading) ? "" : styles.disabled
        }`}
      >
        <div className={`${styles.PageStrategy} `}>
          <PageStrategy onChange={handleChnagepageStrategy} />
        </div>
        <div className={`${styles.componentOption} flex al-i-c just-sb`}>
          <OptionsControl
            onChange={onChangeComponentSwitch}
            key="component"
            label="Component"
            description="Will create a folder in components"
          />
          <ComponentName
            onChange={onChangeComponentName}
            name={name}
            parentname={parentname}
            enabled={!disableControls && state?.component}
          />
        </div>
        <div className="flex just-sb wrap gap10 pl10 ">
          {options
            ?.filter((val) => {
              return pageStrategy === "SSRWrapper"
                ? !["ssrFetcher", "styles"].includes(val?.key)
                : true;
            })
            .map(({ key, label, description }) => (
              <OptionsControl
                onChange={(newVal) => setState({ [key]: newVal })}
                key={key}
                label={label}
                description={description}
              />
            ))}
        </div>
        <AsyncButton
          className={styles.submitBtn}
          onClick={handleSubmit}
          loading={loading}
          text="create Page"
          spinnerColor="white"
          onLoading=" "
        />
      </div>
    </div>
  );
};

export default AddNewPageControl;

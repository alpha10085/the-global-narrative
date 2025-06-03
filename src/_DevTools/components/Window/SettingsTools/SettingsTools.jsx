import useDynamicState from "@/hooks/useDynamicState";
import OptionsControl from "../Components/OptionsControl/OptionsControl";
import styles from "./styles.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import SectionLabel from "../Components/SectionLabel/SectionLabel";
import ListSwitcher from "../Components/ListSwitcher/ListSwitcher";
import MainSwitch from "../Components/MainSwitch/MainSwitch";
import KeysControls from "../Components/KeysControls/KeysControls";
import useAsyncQuery from "@/hooks/useAsyncQuery";
import { getSettings, updateNextConfig } from "@/lib/tools";
import { useEffect } from "react";
import { isValidDomainFormat, validatePageName } from "./helpers";
import { validateComponentName } from "../ComponentTools/AddNewComponentControl/helpers";
import { isEqual } from "lodash";
import AsyncButton from "@/components/Shared/AsyncButton/AsyncButton";
import ListControl from "../Components/ListControl/ListControl";
import Loading from "../Loading/Loading";
const SettingsTools = () => {
  const default_storageData = {
    enabled: false,
    componentsHiddenFolders: ["shared", "Auth"],
    pagesHiddenFolders: ["(auth)"],
  };

  const default_nextConfigSettings = {
    imagesDomains: [],
    reactStrictMode: false,
    scrollRestoration: false,
    middleware_excludes_tags: [],
  };
  // storageData
  const {
    createOrUpdate,
    data: storageData = {},
    isLoading: storageData_isLoading,
  } = useLocalStorage("dev-tools-settings");
  const state_storageData = storageData ?? default_storageData;
  const onChange_storageData = (key, value) => {
    createOrUpdate({
      ...state_storageData,
      [key]: value,
    });
  };
  const { data = null, isLoading } = useAsyncQuery({
    cache: "0s",
    queryKey: ["tools-get-next-config-file"],
    queryFn: getSettings,
  });
  // nextConfigSettings
  const [state, setState] = useDynamicState({
    nextConfigSettings: {
      defualt: default_nextConfigSettings,
      current: default_nextConfigSettings,
    },

    loading: true,
    loading_update: false,
  });

  useEffect(() => {
    if (!isLoading) {
      const nextConfigSettings_data = {
        imagesDomains: data?.nextConfig?.images?.domains || [],
        reactStrictMode: data?.nextConfig?.reactStrictMode,
        scrollRestoration: data?.nextConfig?.experimental?.scrollRestoration,
      };
      setState({
        nextConfigSettings: {
          current: nextConfigSettings_data,
          defualt: nextConfigSettings_data,
        },
        environment: data?.environment,
        loading: false,
      });
    }
  }, [JSON.stringify(data)]);

  const state_nextConfigSettings = state?.nextConfigSettings?.current;
  const onChange_nextConfig = (key, newValue) => {
    setState({
      nextConfigSettings: {
        current: {
          ...state?.nextConfigSettings?.current,
          [key]: newValue,
        },
        defualt: state?.nextConfigSettings?.defualt,
      },
    });
  };
  const onSubmit = async () => {
    try {
      setState({
        loading_update: true,
      });
      const response = await updateNextConfig(state_nextConfigSettings);
      setState({
        nextConfigSettings: {
          current: state_nextConfigSettings,
          defualt: state_nextConfigSettings,
        },
        loading_update: false,
      });
    } catch (error) {
      console.error("Error: ", error);
      setState({
        loading_update: false,
      });
    }
  };

  // environment
  const state_environment = state?.environment;
  if (state?.loading || storageData_isLoading) return <Loading />;
  const ishasChanges_nextConfig = isEqual(
    state?.nextConfigSettings?.defualt,
    state?.nextConfigSettings?.current
  );

  return (
    <div className={`${styles.container} ml-5 showSmooth`}>
      <MainSwitch
        onChange={(newVal) => onChange_storageData("enabled", newVal)}
        key={"enabled"}
        label={"show dev tools"}
        description={"This for switch dev tools control"}
        defaultValue={state_storageData?.enabled}
        wrapper_className={styles.MainSwitch}
      />
      <ListSwitcher
        key={"main-ListSwitcher"}
        enabled={state_storageData?.enabled}
      >
        <SectionLabel label={"next Config"} />
        <ListSwitcher
          key={"nextconfig-ListSwitcher"}
          className={styles.ControlList}
          enabled
        >
          <OptionsControl
            key={"reactStrictMode"}
            onChange={(newVal) =>
              onChange_nextConfig("reactStrictMode", newVal)
            }
            label={"react Strict Mode"}
            description={"This will toggle react Strict Mode"}
            defaultValue={state_nextConfigSettings?.reactStrictMode}
          />
          <OptionsControl
            key={"scrollRestoration"}
            onChange={(newVal) =>
              onChange_nextConfig("scrollRestoration", newVal)
            }
            label={"scroll Restoration"}
            description={"This will toggle scroll Restoration"}
            defaultValue={state_nextConfigSettings?.scrollRestoration}
          />
          <KeysControls
            key={"imagesDomains"}
            validation={isValidDomainFormat}
            onChange={(newVal) => onChange_nextConfig("imagesDomains", newVal)}
            label="image allowed domains"
            inputlabel={"add domain"}
            data={state_nextConfigSettings?.imagesDomains}
          />
          <div className={`${styles.nextconfigbtns} flex just-c gap40 w-100`}>
            <AsyncButton
              key={"group-next-config"}
              text="Save"
              onLoading=" "
              loading={state?.loading_update}
              onClick={onSubmit}
              disabled={ishasChanges_nextConfig || state?.loading_update}
            />
          </div>
        </ListSwitcher>

        <KeysControls
          key={"componentsHiddenFolders"}
          className={styles.ControlList}
          onChange={(newVal) =>
            onChange_storageData("componentsHiddenFolders", newVal)
          }
          validation={validateComponentName}
          label="components Hidden Folders"
          inputlabel={"add component"}
          data={state_storageData?.componentsHiddenFolders}
        />
        <KeysControls
          key={"pagesHiddenFolders"}
          className={styles.ControlList}
          validation={validatePageName}
          onChange={(newVal) =>
            onChange_storageData("pagesHiddenFolders", newVal)
          }
          label="pages Hidden Folders"
          inputlabel={"add page"}
          data={state_storageData?.pagesHiddenFolders}
        />
        <SectionLabel label={"environments Variables"} />
        <ListControl className={styles?.ListControl} data={state_environment} />
      </ListSwitcher>
    </div>
  );
};

export default SettingsTools;

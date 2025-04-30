import { useEffect, useMemo, useState } from "react";
import { translationsConfig } from "@/_Dashboard/configuration/translation/config.translation";
import { delay } from "@/utils/time";
import useAsyncQuery from "@/hooks/useAsyncQuery";
import { getTranslations } from "@/_Dashboard/lib/dashboard";
import { getFieldDetails, getFieldValues, isDateLessThanNow } from "./helpers";

import styles from "./Window.module.css";
import Input from "../Input/Input";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import { joiResolver } from "@hookform/resolvers/joi";

const Window = ({
  slug,
  id,
  _id,
  field,
  onClose,
  className,
  theme,
  watch,
  endpoint,
  validationTransaltions,
  type,
}) => {
  const { allLanguages = [], languageMap = {} } = translationsConfig;
  const [enabled, setEnabled] = useState(isDateLessThanNow(watch("createdAt")));
  const [disableClose, setDisableClose] = useState(true);
  const [closeEvent, setCloseEvent] = useState(false);
  const { fieldKey, path } = useMemo(
    () => getFieldDetails(field),
    [_id, field?.name]
  );
  const validation = validationTransaltions?.[path];
  const queryKey = [
    `${endpoint}-${_id}-${fieldKey}`,
    endpoint,
    _id,
    type === "single" ? id : "",
    fieldKey,
  ];

  const { data = [], isLoading } = useAsyncQuery({
    enabled,
    queryKey,
    queryFn: getTranslations,
    cache: "5m",
  });

  const values = useMemo(
    () => getFieldValues(data, fieldKey),
    [data?.length, fieldKey]
  );

  const handleClose = async () => {
    if (disableClose) return;
    setCloseEvent(true);
    await delay(300);
    onClose();
  };

  useEffect(() => {
    const enableClose = async () => {
      await delay(650);
      setDisableClose(false);
    };
    enableClose();
  }, []);

  const renderInputs = useMemo(() => {
    return allLanguages?.map((language) => (
      <Input
        key={language}
        currentValue={values?.[language]?.value}
        _id={values?.[language]?._id}
        field={{
          ...field,
          label: languageMap?.[language],
          name: fieldKey,
        }}
        endpoint={endpoint}
        theme={theme}
        className={className}
        callBack={() => setEnabled(true)}
        language={language}
        path={path}
        ref={_id}
        pageKey={type === "single" ? id : ""}
        queryKey={queryKey}
        validation={validation}
      />
    ));
  }, [values]);

  return (
    <div
      className={`${styles.layout} showSmooth ${
        closeEvent && styles.close
      }`}
    >
      <div
        onClick={handleClose}
        className={`${styles.overlayBg}  ${
          theme?.name === "dark" && styles.darkMode
        }`}
      ></div>
      <div className={`${styles.window} ${theme.bord20} ${theme.bg200}`}>
        <div className={`${styles.head} ${theme.bord20} w-100 flex just-sb`}>
          <h1 className="flex-c gap10">
            <LanguageIcon />{" "}
            {field?.parentlabel && (
              <>
                <span>{field?.parentlabel}</span>
                <span className={styles.midline}> / </span>
              </>
            )}
            <span  >{field?.label}</span>
          </h1>
          <span
            onClick={handleClose}
            className={`${styles.btnclose} ${theme?.btn20} flex-c active`}
          >
            <CloseIcon />
          </span>
        </div>
        <div
          className={`${styles.listInputs} ${theme.scrollBar} flex column gap`}
        >
          {isLoading ? "loading ..." : renderInputs}
        </div>
      </div>
    </div>
  );
};

export default Window;

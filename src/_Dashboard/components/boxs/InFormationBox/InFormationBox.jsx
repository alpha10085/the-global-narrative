import React, { useMemo } from "react";
import styles from "./InFormationBox.module.css";
import { formatTimeAgo } from "@/utils/date";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { useAuth } from "@/contexts/AuthProvider";
import DropDown from "../../Dropdown/Dropdown";
import { getlanguagesMap } from "@/i18n/config";
import useDynamicState from "@/hooks/useDynamicState";
import PopupDelete from "../PopupDelete/PopupDelete";
import Link from "@/components/Shared/LocalizedLink/Link";
const InFormationBox = ({
  className = "",
  schema = {},
  modeState,
  currentData,
  theme,
  disableSave,
  handleResetToInitForm,
  handleDelete,
  submitForm,
  loading,
  switchLanguage,
  translations = {},
  language,
}) => {
  const { roles = {} } = schema?.options || {};

  let canDeleted = roles?.delete && modeState === "update";
  let canCreateNew = modeState === "update" && roles?.create;
  const handleDynamicHeight = () => {
    if (modeState !== "update") {
      return 75;
    } else {
      let height = 225;
      height = currentData?.createdBy?.fullName ? height : height - 32;
      height = currentData?.updatedBy?.fullName ? height : height - 32;
      height = canCreateNew ? height + 44 : height;
      height = roles?.update ? height + 44 : height;
      height = canDeleted ? height + 44 : height;
      height = schema?.options?.translation ? height + 75 : height;
      return height;
    }
  };

  const { session } = useAuth();

  const AttributionLink = ({ person, isCurrentUser }) => {
    const href = isCurrentUser
      ? `/dashboard/profile`
      : `/dashboard/settings/admins/${person?._id}`;
    const displayName = isCurrentUser
      ? `@ ${translations.you}`
      : `@${person?.fullName || ""}`;

    return (
      <Link className="flex-c " href={href}>
        {displayName}
        <ArrowOutwardIcon className="svg-dir" />
      </Link>
    );
  };

  const handleIfAttributedToMe = (person = {}) => {
    const isCurrentUser = person?._id === session?._id;
    return <AttributionLink person={person} isCurrentUser={isCurrentUser} />;
  };

  const CreatedBy = useMemo(
    () => handleIfAttributedToMe(currentData?.createdBy),
    [currentData?.createdBy, session?._id]
  );

  const UpdatedBy = useMemo(
    () => handleIfAttributedToMe(currentData?.updatedBy),
    [currentData?.updatedBy, session?._id]
  );

  const languagesMap = getlanguagesMap(translations);
  const callBack = (newVal) => {
    if (language === newVal || !newVal) return;
    switchLanguage(newVal);
  };

  // Use your custom hook to manage state
  const [state, updateState, resetState] = useDynamicState({
    popupOpen: false,
    loading: false,
  });
  const { popupOpen } = state;

  return (
    <section
      style={{ height: `${handleDynamicHeight()}px` }}
      className={`${className}  ${styles.info} 
     ${theme?.background} 
    ${theme.bord20} `}
    >
      {modeState === "update" ? (
        <>
          <h1 className={`${styles.title} showSmooth `}>
            {translations?.information}
          </h1>
          <ul className={`${styles.ul} showSmooth`}>
            <li>
              <h1>{translations?.createdAt}</h1>{" "}
              <p>{formatTimeAgo(currentData?.createdAt, translations)}</p>
            </li>
            <li>
              <h1>{translations?.lastUpdate}</h1>{" "}
              <p>{formatTimeAgo(currentData?.updatedAt, translations)}</p>
            </li>
            {currentData?.createdBy?.fullName && (
              <li className="showSmooth">
                <h1>{translations?.createdBy}</h1> {CreatedBy}
              </li>
            )}
            {currentData?.updatedBy?.fullName && (
              <li className="showSmooth">
                <h1>{translations?.updatedBy}</h1> {UpdatedBy}
              </li>
            )}
          </ul>
        </>
      ) : null}
      <div className={`flex-c showSmooth column gap10 ${styles.btnsBottom}`}>
        {schema?.options?.translation && modeState === "update" && (
          <>
            <h1 className={styles.localeTile}>
              {translations?.informationLocale
                ? translations?.informationLocale
                : translations?.locales}
            </h1>
            <DropDown
              theme={theme}
              callBack={callBack}
              className={styles.dropDown}
              options={languagesMap}
              currentValue={
                languagesMap?.find((l) => l?.key === language)?.label
              }
            />
          </>
        )}
        {canDeleted && (
          <button
            disabled={loading}
            onClick={() => updateState({ popupOpen: true })}
            className={`${styles.deleteButton} ${theme?.danger10}`}
          >
            {translations?.delete}
          </button>
        )}
        {/* Custom Popup */}
        <PopupDelete
          open={popupOpen}
          onClose={() => updateState({ popupOpen: false })}
          onConfirm={handleDelete}
          theme={theme}
          translations={translations}
          loading={loading}
        />
        {roles?.update && (
          <button
            disabled={loading || disableSave}
            onClick={submitForm}
            className={`${styles.btnSubmit}  ${theme?.button} `}
          >
            {loading
              ? translations?.saveing
              : disableSave
              ? translations?.noChanges
              : translations?.save}
          </button>
        )}
        {canCreateNew && (
          <button
            disabled={loading}
            onClick={handleResetToInitForm}
            className={`${styles.btnSubmit} ${theme?.background} ${theme?.btn30}`}
          >
            {translations?.createNew}
          </button>
        )}
      </div>
    </section>
  );
};

export default InFormationBox;

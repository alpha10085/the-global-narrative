
import styles from "./PopupAddNewEntry.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import useDisableScroll from "@/hooks/useDisableScroll";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";

import useTranslations from "@/hooks/useTranslations";
import Spinner from "@/components/Shared/Spinner/Spinner";

import Form from "./Form";
import { useFetch } from "./helpers";

const PopupAddNewEntry = ({
  slug = "",
  select = [],
  handleSelect = () => {},
  close = () => {},
  type,
  translations: dynamicFormTranslations = {},
  language = "",
  locale,
  translationKeys = [],
  schema = {},
  validation,
  displayName = "",
}) => {
  const { data, error, isLoading, refetch } = useFetch(slug);
  const { theme } = useTheme();
  const thisSchemaTranslations = useTranslations("Dashboard", [
    ...translationKeys,
    `displaynames.${displayName}`,
  ]);
  const translations = {
    ...dynamicFormTranslations,
    ...thisSchemaTranslations,
    inputs: {
      ...(thisSchemaTranslations?.inputs || {}),
      ...(dynamicFormTranslations?.inputs || {}),
    },
    displaynames: {
      ...(thisSchemaTranslations?.displaynames || {}),
      ...(dynamicFormTranslations?.displaynames || {}),
    },
  };

  const {
    
  } = useDisableScroll({
    default:true
  });
  return (
    <section className={`${styles.layout} flex al-i-c `}>
      <div onClick={close} className={styles.BgBlur} />

      <div
        className={`${styles.formlayout}  ${theme?.background} ${theme.bord20}`}
      >
        <div className={`${styles.head} ${theme.bg200} ${theme.bord20}  w-100`}>
          <h1 className=" ml-10 mb-5">
            {translations?.createNew}{" "}
            {translations?.displaynames?.[displayName]}
          </h1>
          <span onClick={close} className={`${styles.btnclose}  `}>
            <CloseIcon />
          </span>
        </div>
        {isLoading ? (
          <div className={`${styles.loaderLayout} flex-c `}>
            <Spinner theme={theme?.name} />
          </div>
        ) : (
          <Form
            close={close}
            data={data}
            error={error}
            handleSelect={handleSelect}
            isLoading={isLoading}
            language={language}
            refetch={refetch}
            locale={locale}
            theme={theme}
            translations={translations}
            type={type}
            validation={validation}
            schema={schema}
            slug={slug}
            select={select}
          />
        )}
      </div>
    </section>
  );
};

export default PopupAddNewEntry;

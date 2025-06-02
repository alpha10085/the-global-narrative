import styles from "./PopupAddNewEntry.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCallback, useMemo } from "react";
import FieldManager from "../../FieldManger/FieldManger";
import toast from "react-hot-toast";
import { handleDynamicFormApi } from "@/_Dashboard/lib/dashboard";
import {
  getChangedFields,
  handleDetecteErrorTranslations,
} from "@/_Dashboard/layouts/DynamicForm/helpers";
import AsyncButton from "@/components/Shared/AsyncButton/AsyncButton";
import { useQueryClient } from "@tanstack/react-query";
import { scrollToErrorElemntry, scrollToSection, useFetch } from "./helpers";
import ErrorLayOut from "../../ErrorLayOut/ErrorLayOut";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import useDynamicState from "@/hooks/useDynamicState";
const Form = ({
  validation,
  locale,
  close,
  error,
  data,
  theme,
  type,
  refetch,
  translations,
  language,
  handleSelect,
  schema,
  slug,
  select,
}) => {
  const queryClient = useQueryClient();
  const resolver = useMemo(
    () => joiResolver(validation(locale)),
    [locale, validation]
  );

  const [state, setState, _, setStateWithCK] = useDynamicState({
    loading: false,
    disableSubmit: null,
  });
  const { loading, disableSubmit } = state;
  const {
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver,
    modeState: "onChange",
    values: data,
  });
  const onChange = useCallback(
    (key, val, runTrigger = true) => {
      setValue(key, val);
      setStateWithCK((prev) => {
        if (prev?.disableSubmit === key) {
          return {
            ...prev,
            disableSubmit: null,
          };
        }
        return prev;
      });
      // Optional: Trigger field validation
      // runTrigger && trigger()
    },
    [setValue, setState]
  );
  const currentData = getValues();
  const formProps = useMemo(
    () => ({
      watch,
      onChange,
      errors,
      theme,
      type,
      className: `${styles?.label}`,
      translations,
      clearErrors,
      language,
      _id: currentData?._id,
      root_id: currentData?._id,
    }),
    [watch, onChange, errors, theme, currentData]
  );
  const revalidateCache = async () => {
    try {
      const queryKeys = [slug, ...(schema?.options?.cache?.tags || [])]?.filter(
        Boolean
      );
      // Remove inactive queries
      queryKeys.map(async (key) =>
        queryClient.removeQueries({ queryKey: [key], type: "inactive" })
      );
    } catch (error) {}
  };
  const submit = async (formdata) => {
    setState({
      loading: true,
    });
    try {
      toast.promise(
        handleDynamicFormApi({
          mode: "create",
          formdata: getChangedFields({}, formdata),
          slug,
          type,
        }),
        {
          loading: "saveing...",
          success: (res) => {
            const newval = Object.fromEntries(
              Object.entries(res?.data || {}).filter(([key, value]) =>
                select?.includes(key)
              )
            );

            handleSelect(newval);
            revalidateCache();
            close();
            setState({
              loading: true,
            });

            return `${res?.message}`;
          },
          error: (error) => {
            // Handle form submission error
            const errorTarget = handleDetecteErrorTranslations(
              error,
              setError,
              watch,
              translations?.inputs?.duplicationError
            );
            scrollToSection(
              `#${
                errorTarget ? handleReplaceDot(errorTarget) : "popupaddnewmain"
              }`,
              50
            );
            setState({
              loading: false,
              ...(errorTarget ? { disableSubmit: errorTarget } : {}),
            });
            return `${error?.message}`;
          },
        }
      );
    } catch (error) {
      console.error("error", error);
    }
  };
  console.log(errors);
  

  if (error) return <ErrorLayOut callBack={refetch} />;
  return (
    <>
      <div
        id={"popupaddnewmain"}
        className={` wrap ${styles.form} showSmooth  ${theme.scrollBar} `}
      >
        {schema?.fields?.map((field) => (
          <FieldManager
            key={field.name}
            field={{
              ...field,
              label: translations?.inputs?.[field?.label],
              placeholder: translations?.inputs?.[`${field?.label}_ph`],
            }}
            formProps={formProps}
            mode={"create"}
          />
        ))}
      </div>
      <div
        className={`${styles.boxbtnsubmit} ${theme.background} ${theme.bord20} w-100 flex-c`}
      >
        <AsyncButton
          loading={loading}
          error={disableSubmit ? translations?.inputs?.duplicationError : null}
          onClick={handleSubmit(submit, scrollToErrorElemntry)}
          className={`${styles.btnSubmit} ${theme?.background} ${theme?.btn30}`}
          theme={theme.name}
          text={translations?.createNew}
          onLoading=" "
        />
      </div>
    </>
  );
};

export default Form;

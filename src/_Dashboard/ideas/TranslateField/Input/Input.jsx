"use client";
import React, { memo, useState } from "react";
import styles from "./Input.module.css";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import { useClickOut } from "@/hooks/useClickout";
import AsyncButton from "@/Components/Shared/AsyncButton/AsyncButton";
import { upsertOneTranslation } from "@/_Dashboard/lib/dashboard";
import toast from "react-hot-toast";
import { delay } from "@/utils/time";
import { handleRefreshCache } from "../Window/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import useDynamicState from "@/hooks/useDynamicState";
const Component = ({
  theme,
  className = "",
  field = {},
  currentValue = "",
  endpoint,
  _id = null,
  ref = null,
  language = "",
  path = null,
  pageKey = null,
  queryKey = [],
  validation = null,
}) => {
  const [dir, setDir] = useState("ltr"); // Default direction is LTR

  const { placeholder , label} = field;
  const queryClient = useQueryClient();
  const [focus, setFocus] = useState(false);

  const [state, setState] = useDynamicState({
    loading: false,
    value: currentValue,
    prevValue: currentValue,
    _id,
  });

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: joiResolver(validation),
    mode: "all",
  });
  const error = errors?.[field?.name]?.message;

  const { windowRef } = useClickOut({
    onClickOutside: () => setFocus(false),
  });

  const handleChnageError = (err) => {
    setError(field?.name, err);
  };
  const onSubmit = async () => {
    try {
      setState({
        loading: true,
      });
      const data = await upsertOneTranslation({
        body: {
          key: field?.name,
          value: state?.value?.toString()?.trim(),
          language,
          path,
        },
        ref,
        endpoint,
        pageKey,
        _id: state?._id,
      });

      const newDate = {
        value: data?.value,
        _id: data?._id,
      };
      handleRefreshCache(queryClient, {
        queryKey,
        newData: {
          ...newDate,
          key: data?.key,
          language: data?.language,
        },
      });
      setState((prev) => {
        return {
          ...prev,
          error: null,
          ...newDate,
          prevValue: prev?.value,
        };
      });
      toast.success("translation saved successfully");
    } catch (e) {
      toast.error(e.slug);
      handleChnageError(e.slug);
    }
    setState({
      loading: false,
    });
  };

  const handleChangeValue = (value) => {
    setState({
      value,
    });
    setValue(field?.name, value);
    if (error) {
      handleChnageError(undefined);
    }
    const isArabic = /[\u0600-\u06FF]/.test(value);
    setDir(isArabic ? "rtl" : "ltr");
  };

  return (
    <label
      className={`flex column showSmooth  ${styles.fullSize} ${styles.label} ${className}`}
    >
      <div className={`${styles.head} flex just-sb`}>
        <h1 className="flex al-i-c ">{field?.label} </h1>
      </div>
      <div
        ref={windowRef}
        onClick={() => setFocus(true)}
        open={focus}
        className={`${styles.inputwrapper} ${focus && theme.inputFocused} ${
          error && theme.inputError
        }  ${theme?.background}  ${theme?.color} ${theme?.bord20}`}
      >
        <textarea
          dir={dir}
          onChange={({ target }) => handleChangeValue(target?.value)}
          className={`${theme?.color} ${theme.scrollBar} ${styles.textarea}`}
          value={state?.value}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage className={`${styles.errormsg}`} message={error} label={label}/>

      <AsyncButton
        onClick={handleSubmit(onSubmit)}
        className={`${styles.button} gap5 ${theme.btn30}`}
        disabled={state.loading || state.prevValue === state.value}
        loading={state?.loading}
        theme={theme?.name}
        reverseTheme
        onLoading=" "
        text={state.prevValue === state.value ? "No changes" : "Save Changes"}
      />
    </label>
  );
};

const TextInputMemoization = (prevProps, nextProps) => {
  return (
    prevProps?.currentValue === nextProps?.currentValue &&
    prevProps?.theme?.name === nextProps?.theme?.name &&
    prevProps?.field?.name === nextProps?.field?.name &&
    prevProps?.endpoint === nextProps?.endpoint &&
    prevProps?._id === nextProps?._id &&
    prevProps?.ref === nextProps?.ref &&
    prevProps?.language === nextProps?.language &&
    prevProps?.path === nextProps?.path &&
    prevProps?.pageKey === nextProps?.pageKey
  );
};
const Input = memo(Component, TextInputMemoization);

export default Component;

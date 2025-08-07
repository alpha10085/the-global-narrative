"use client";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./RelationList.module.css";
import { isEqual, debounce } from "lodash";
import useInfinityQuery from "@/hooks/useInfinityQuery";
import { relationOptionsAPi } from "@/_Dashboard/lib/dashboard";
import { handleSingle } from "@/utils/object";
import PopupAddNewEntry from "../../boxs/PopupAddNewEntry/PopupAddNewEntry";
import QueueIcon from "@mui/icons-material/Queue";
import { useClickOut } from "@/hooks/useClickout";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import { handleDynamicFilters, memoizedHandler } from "./helpers";
import List from "./List/List";
import SelectedList from "./SelectedList/SelectedList";
import { handleDynamicFields } from "@/_Dashboard/layouts/DynamicForm/helpers";
import ErrorMessage from "@/_Dashboard/components/ErrorMessage/ErrorMessage";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import { delay } from "@/utils/time";
const RelationList = ({
  field,
  theme,
  className,
  onChange = () => "",
  currentValue,
  error,
  mode = "update",
  type = "",
  customFilters = {},
  disabled = false,
  onDisabled = "disabled",
  translations,
  language = "en",
  locale,
  getValues = {},
}) => {
  const { ref } = useClickOut({
    onClickOutside: () => setOpen(false),
  });
  const {
    select = null,
    readOnlyAfterCreate = false,
    single = true,
    max = 10,
    ref: entryRef = "",
    filters = {},
    imageField,
    filtersArray = [],
  } = field;
  const [popupAddNew, setPopupAddNew] = useState(false);
  const [inputValue, setInputSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState(
    handleSingle(currentValue, single)
  );
  const openOptions = single ? true : !(optionSelected?.length === max);
  const input_id = handleReplaceDot(field?.name);

  let blockUpdate = readOnlyAfterCreate && mode !== "create";
  const debouncedSearch = useCallback(debounce(setInputSearch, 500), []);

  let allFilters = {
    ...filters,
    ...customFilters,
  };
  let filtersquery = {
    ...(inputValue && { search: inputValue }),
    ...(select && { fields: select.concat(imageField || []) }),
    ...Object.keys(allFilters).reduce((acc, key) => {
      acc[`filters[${key}]`] = allFilters[key];
      return acc;
    }, {}),
    "filters[publish]":true,
    ...handleDynamicFilters(filtersArray, getValues),
  };

  const mainCondition = open && openOptions;
  const {
    data = {},
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfinityQuery({
    Key: [field?.ref, filtersquery, language],
    next: relationOptionsAPi,
    enabled: open && !disabled,
    cache: "1h",
  });
  const handleChangeQuery = ({ target }) => {
    setOpen(true);
    debouncedSearch(target?.value);
  };

  const handleSelect = (value) => {
    setOpen(false);
    let newVal;
    if (single) {
      newVal = value;
    } else {
      if (optionSelected?.length === field?.max) return;
      newVal = optionSelected?.some((i) => i?._id === value?._id)
        ? optionSelected
        : [...optionSelected, value];
    }
    setOptionSelected(newVal);
    onChange(field?.name, newVal);
  };
  const handlegetIds = (value = []) => {
    if (single) {
      return [value?._id];
    }
    return value?.map((t) => t?._id);
  };

  const toggleOptions = () => {
    if ((!openOptions && blockUpdate) || open === true) return;
    const handleFoucs = async () => {
      await delay(300);
      const element = document.querySelector(`#${input_id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate how much to scroll to ensure the element is fully visible
        let scrollToPosition = window.scrollY;

        // If the element's top is above the viewport
        if (rect.top < 0) {
          scrollToPosition += rect.top; // Scroll up to align the top
        }

        // If the element's bottom is below the viewport
        if (rect.bottom > windowHeight) {
          scrollToPosition += rect.bottom - windowHeight; // Scroll down to align the bottom
        }

        // Perform the scroll if needed
        if (rect.top < 0 || rect.bottom > windowHeight) {
          window.scrollTo({
            top: scrollToPosition + 50,
            behavior: "smooth",
          });
        }
      }
    };
    setOpen((prev) => {
      if (prev) {
        return false;
      }
      handleFoucs();
      return true;
    });
  };
  const openpopup = () => {
    if (disabled) return;
    setPopupAddNew(true);
    setOpen(false);
  };
  const { schema, validation, displayName = "" } = useSchema(entryRef, false , "collections");
  const popupProps = useMemo(() => {
    return { ...handleDynamicFields(schema), schema, validation, displayName };
  }, [schema]);

  useEffect(() => {
    if (
      !isEqual(
        handleSingle(currentValue, single),
        handleSingle(optionSelected, single)
      )
    )
      setOptionSelected(handleSingle(currentValue, single));
  }, [currentValue]);
  const filteredData = data?.pages?.filter(
    (d) => !handlegetIds(optionSelected)?.includes(d?._id)
  );

  useEffect(() => {
    if (hasNextPage && !filteredData?.length && open && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, open, isLoading]);

  return (
    <>
      <div
        ref={ref}
        id={input_id}
        open={open}
        className={`${
          styles.layout
        } showSmooth  ${className} flex  column
        
        ${!single ? styles.fullwidth : ""}
        `}
      >
        <h1 className={styles.title}>
          {field?.label} {single ? "" : `(${optionSelected.length})`}
        </h1>
        <ErrorMessage theme={theme} message={error} />
        <div
          className={`${styles.seachBar} ${
            theme?.background
          } flex just-sb al-i-c ${theme?.bord20} ${
            open && theme.inputFocused
          } ${error && theme.inputError}`}
        >
          <input
            onClick={toggleOptions}
            placeholder={
              disabled
                ? onDisabled
                : optionSelected?.length === max
                ? `max is ${max}`
                : field.placeholder
            }
            type="text"
            onChange={handleChangeQuery}
            disabled={disabled || optionSelected?.length === max}
            className={` ${theme?.color} `}
          />
          <button
            disabled={
              popupProps?.hasRelatedFields ||
              disabled ||
              optionSelected?.length === max
            }
            onClick={openpopup}
            className={`${styles.linkToAddNew} ${theme.color}  clickAble flex-c`}
          >
            <QueueIcon />
          </button>
        </div>

        {
          <List
            fetchNextPage={fetchNextPage}
            field={field}
            filteredData={filteredData}
            handleSelect={handleSelect}
            hasNextPage={hasNextPage}
            imageField={imageField}
            isLoading={isLoading}
            mainCondition={mainCondition}
            theme={theme}
            translations={translations}
          />
        }
        <SelectedList
          field={field}
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
          theme={theme}
          onChange={onChange}
          active={mainCondition}
        />
      </div>
      {popupAddNew && (
        <PopupAddNewEntry
          translations={translations}
          slug={entryRef}
          theme={theme}
          type={type}
          close={() => setPopupAddNew(false)}
          select={[...select, imageField].filter(Boolean)}
          handleSelect={handleSelect}
          language={language}
          locale={locale}
          {...popupProps}
        />
      )}
    </>
  );
};
export default memo(RelationList, memoizedHandler);

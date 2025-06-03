import { useRef, useMemo, useState } from "react";
import styles from "./FilterSystem.module.css";
import TuneIcon from "@mui/icons-material/Tune";

import { useQueryParams } from "@/hooks/useQueryParams";

import DropDown from "@/_Dashboard/_Components/Dropdown/Dropdown";
import BooleanInput from "@/_Dashboard/_Components/Inputs/booleanInput/BooleanInput";
import TextInputs from "./Components/TextInputs/TextInputs";
import SearchInput from "../Inputs/searchInput/searchInput";
import FiltersList from "./Components/FiltersList/FiltersList";
import { useClickOut } from "@/hooks/useClickout";
import {
  
  formatSearchParams,
  objectToUrl,
} from "@/_Dashboard/_Components/FilterSystem/helper";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { filtersCondtions } from "./helper";

const FilterSystem = ({
  keys,
  withFilters = true,
  withSearch = true,
  slug = "",
  translations,
}) => {
  const BtnRemoteRef = useRef(null);
  const [query, setQuery] = useState({});
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const { searchParams, singleValue, clearOne } = useQueryParams();
  const search = searchParams["search"] || "";
  const { ref } = useClickOut({
    BtnRemoteRef,
    onClickOutside: () => setOpen(false),
  });
  // need to handle cases [relation , dates]
  const listKeys = useMemo(
    () =>
      keys?.filter((f) =>
        ["text", "textarea", "boolean", "number", "translate"].includes(f?.type)
      ),
    [slug]
  );
  const convertedObject = formatSearchParams(
    searchParams,
    listKeys,
    filtersCondtions?.map((o) => o?.key),
    "filters"
  );
  const handleChangeQuery = (value, key) => {
    let newFilter = { ...query, [key]: value };

    if (typeof value === "boolean") newFilter.condition = "eq";

    const feildP = keys?.find((v) => v?.key === value);

    if (feildP?.type) newFilter.type = feildP?.type;
    setQuery(newFilter);
  };
  const handleSubmit = (remove = null) => {
    let values = remove || query;
    try {
      // Check if values are defined and if value is neither undefined nor null
      if (
        values?.key &&
        values?.condition &&
        values?.value &&
        typeof values?.value === "string"
      ) {
        setOpen(false);
        setQuery({});

        const filter = {
          [values.key]: {
            [values.condition]: values.value,
          },
        };

        // Assuming objectToUrl returns a properly formatted object for URL usage
        singleValue(
          `${Object.keys(objectToUrl(filter, "filters"))?.[0]}`,
          values?.value?.trim()
        );

        setQuery({});
      }
    } catch (error) {
      console.error("Error submitting filter:", error);
    }
  };
  return (
    <div className={`${styles.metadata} gap10 wrap flex al-i-c `}>
      {withSearch && (
        <SearchInput
          currentVal={search}
          onChange={singleValue}
          onClear={clearOne}
          theme={theme}
          className={styles.seacrBar}
        />
      )}
      {withFilters && (
        <>
          <div className="flex al-c-c just-sb al-i-c mt5 ">
            <div
              className={`${styles.body} ${theme?.bord20} ${theme?.background} flex-c`}
            >
              <span
                ref={BtnRemoteRef}
                onClick={() => setOpen(!open)}
                className="flex al-i-c al-c-c gap5"
              >
                <TuneIcon />
              </span>
              {open && (
                <div
                  ref={ref}
                  className={`${styles.options} ${theme?.bord20} ${theme?.background}`}
                >
                  <DropDown
                    options={listKeys}
                    callBack={(item) => handleChangeQuery(item, "key")}
                    className={`${theme?.background} w-90 ${theme?.bord20} ${styles.label}`}
                    currentValue={query?.key}
                    theme={theme}
                  />
                  <DropDown
                    callBack={(key) => {
                      
                      handleChangeQuery(key, "condition");
                    }}
                    options={filtersCondtions
                      ?.filter((v) => v?.type.includes(query?.type))
                      .map((val) => {
                        return {
                          key: val?.key,
                          label: translations?.filterSystem?.condtions?.[val?.key],
                        };
                      })}
                    currentValue={
                      translations?.filterSystem?.condtions?.[query?.condition]
                    }
                    className={`${theme?.background} w-90 ${theme?.bord20} ${styles.label}`}
                    show={query?.type !== "boolean"}
                    theme={theme}
                  />
                  <TextInputs
                    disabled={!query?.condition}
                    className={`${theme?.background} w-90 ${theme?.color} ${theme?.bord20} input ${styles.label}`}
                    placeholder="value"
                    name="value"
                    show={
                      ["text", "number", "translate"].includes(query?.type) ||
                      !query?.type
                    }
                    theme={theme}
                    currentValue={query?.value}
                    type={query?.type}
                    callback={(val) => handleChangeQuery(val, "value")}
                  />
                  <BooleanInput
                    onChange={(n, val) => handleChangeQuery(val, "value")}
                    theme={theme}
                    show={query?.type === "boolean"}
                    className={styles.BooleanInput}
                  />
                  <button
                    onClick={() => handleSubmit()}
                    className={`${styles.button} ${theme?.bord20} ${theme?.color} ${theme?.background}`}
                  >
                    add filter
                  </button>
                </div>
              )}
            </div>
          </div>
          <FiltersList
            filtersCondtions={filtersCondtions}
            handleSbmit={handleSubmit}
            theme={theme}
            convertedObject={convertedObject}
            translations={translations}
          />
        </>
      )}
    </div>
  );
};

export default FilterSystem;

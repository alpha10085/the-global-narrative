import { filtersCondtions } from "@/_Dashboard/_Components/FilterSystem/helper";

export const getlabelFiltersCondtions = (nested="") => filtersCondtions.map((val) => `${nested ? `${nested}.` :""}${val?.key}`);

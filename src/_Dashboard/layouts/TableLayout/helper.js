import { filtersCondtions } from "@/_Dashboard/components/FilterSystem/helper";

export const getlabelFiltersCondtions = (nested="") => filtersCondtions.map((val) => `${nested ? `${nested}.` :""}${val?.key}`);

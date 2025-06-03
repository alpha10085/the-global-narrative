import { filtersCondtions } from "@/_Dashboard/Components/FilterSystem/helper";

export const getlabelFiltersCondtions = (nested="") => filtersCondtions.map((val) => `${nested ? `${nested}.` :""}${val?.key}`);

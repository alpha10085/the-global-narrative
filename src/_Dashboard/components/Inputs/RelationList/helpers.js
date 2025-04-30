import { isEqual } from "lodash";

export const swapItems = (optionSelected, index, newIndex, callback) => {
  // Create a shallow copy of the array to avoid modifying the state directly
  const newVal = [...optionSelected];
  // Swap the elements in the copied array
  [newVal[index], newVal[newIndex]] = [newVal[newIndex], newVal[index]];
  // Update the state with the new array
  callback(newVal);
};

export const memoizedHandler = (p, n) => {
  return (
    isEqual(p.currentValue, n.currentValue) &&
    isEqual(p?.customFilters, n?.customFilters) &&
    p?.disabled === n?.disabled &&
    p?.field?.name === n?.field?.name &&
    p?.error === n?.error &&
    p?.slug === n?.slug
  );
};

export const handleDynamicFilters = (
  filtersArray = {},
  getValues = () => {}
) => {
  const data = getValues();
  const transformedFilters = {};
  filtersArray.forEach((filter) => {
    // Extract the key inside the brackets (e.g., "_id", "title", etc.)
    const match = filter.match(/filters\[(.*?)\]/);
    if (match) {
      const key = match[1]; // Extracted key
      if (data[key] !== undefined) {
        transformedFilters[filter] = data[key];
      }
    }
  });
  return transformedFilters;
};

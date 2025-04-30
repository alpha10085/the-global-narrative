import { useMemo } from "react";

export const getFieldDetails = (field) => {
  const getFieldKey = field?.name.split(".");
  const path = getFieldKey.length > 1 ? getFieldKey[0] : "root";
  const fieldKey = getFieldKey[getFieldKey.length - 1];
  return { path, fieldKey };
};

export const getFieldValues = (data = [], fieldKey) => {
  return data?.reduce((acc, curr) => {
    if (curr?.key !== fieldKey) return acc;
    acc[curr.language] = {
      value: curr?.value,
      _id: curr?._id,
    };
    return acc;
  }, {});
};

export const isDateLessThanNow = (date) => {
  try {
    const now = new Date(); // Get the current date and time
    const nowPlus5Minutes = new Date(now.getTime() + 10 * 1000); // Add 10 sec to the current time
    return new Date(date) < nowPlus5Minutes; // Compare the given date with now + 10 sec
  } catch (error) {
    return false; // Return false if any error occurs during the comparison
  }
};
export const handleRefreshCache = (queryClient, { queryKey, newData = {} }) => {
  queryClient.setQueryData(queryKey, (oldData = []) => {
    const updatedData = oldData?.map((item) =>
      item?._id === newData?._id ? { ...item, ...newData } : item
    );

    return newData?._id && !oldData?.some((item) => item?._id === newData?._id)
      ? [...updatedData, newData]
      : updatedData;
  });

  return true;
};

export const sortByIdsOrder = (arrayofdata = [], orderList = []) => {
  try {
    const orderedIds = Array.isArray(orderList) ? orderList : [];
    const data = Array.isArray(arrayofdata) ? arrayofdata : [];
    const idOrderMap = new Map(
      orderedIds?.map((id, index) => [id.toString(), index])
    );

    return data.sort((a, b) => {
      return (
        idOrderMap.get(a._id.toString()) - idOrderMap.get(b._id.toString())
      );
    });
  } catch (error) {
    return arrayofdata;
  }
};

export const handleArrayOdIds = (array = []) => {
  try {
    return Array.isArray(array)
      ? array
      : typeof array === "string"
      ? array.split(",")
      : [];
  } catch (error) {
    return [];
  }
};
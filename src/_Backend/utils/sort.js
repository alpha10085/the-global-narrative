export const sortByIdsOrder = (arrayofdata = [], orderList = []) => {
  console.log("🚀 ~ sortByIdsOrder ~ arrayofdata:", arrayofdata);
  console.log("🚀 ~ sortByIdsOrder ~ orderList:", orderList);
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

export const handleArrayOdIds = (array = "") => {
  try {
    return Array.isArray(ids)
      ? ids
      : typeof ids === "string"
      ? ids.split(",")
      : [];
  } catch (error) {
    return array;
  }
};

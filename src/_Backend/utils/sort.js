export const  sortByIdsOrder = (data, orderedIds) => {
  const idOrderMap = new Map(
    orderedIds.map((id, index) => [id.toString(), index])
  );

  return data.sort((a, b) => {
    return idOrderMap.get(a._id.toString()) - idOrderMap.get(b._id.toString());
  });
}

export const customQuery = [
    {
      field: "category",
      target:"categories",
      fromCollection: "categories",
      localField: "category",
      foreignField: "_id",
      matchField: "slug",
    //   unwind: true,
    },
  ];
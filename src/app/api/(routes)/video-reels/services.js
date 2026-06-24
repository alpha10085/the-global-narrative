export const customQuery = [
    {
      field: "category",
      target:"categories",
      fromCollection: "newscategories",
      localField: "category",
      foreignField: "_id",
      matchField: "slug"
    },
  ];
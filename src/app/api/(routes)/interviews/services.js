export const customQuery = [
    {
      field: "category",
      target:"categories",
      fromCollection: "interviewcategories",
      localField: "category",
      foreignField: "_id",
      matchField: "slug"
    },
  ];
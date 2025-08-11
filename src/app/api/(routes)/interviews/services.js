export const customQuery = [
    {
      field: "category",
      target:"categories",
      fromCollection: "interviewCategory",
      localField: "category",
      foreignField: "_id",
      matchField: "slug"
    },
  ];
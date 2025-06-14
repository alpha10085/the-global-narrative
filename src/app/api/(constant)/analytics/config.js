 export const trivialPaths = ["/favicon.ico", "/robots.txt", "/favicon.png"];


  // data Types 
 export const insightPipelines = {
    dailyTraffic: [
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ],
    country: [
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ],
    devices: [
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ],
    pageViews: [
      {
        $group: {
          _id: "$pathname",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ],

    // ADD MORE data Type 
  };
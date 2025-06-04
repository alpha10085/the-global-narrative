export const filterConfigs = [
  {
    key: "days",
    label: "Days",
    options: [
      { value: "7", label: "Last 7 days" },
      { value: "30", label: "Last 30 days" },
      { value: "100", label: "Last 100 days" },
    ],
  },
  {
    key: "pathname",
    label: "Page Path",
    options: [
      { value: "", label: "All" },
      { value: "/en", label: "Home" },
      { value: "/en/test-insights", label: "test-insights" },
    ],
  },
  {
    key: "device",
    label: "Device",
    options: [
      { value: "", label: "All" },
      { value: "desktop", label: "desktop" },
      { value: "mobile", label: "mobile" },
      { value: "tablet", label: "tablet" },
    ],
  },
  {
    key: "chartType",
    label: "Chart Type",
    options: [
      { value: "dailyTraffic", label: "Daily Traffic" },
      { value: "country", label: "Country-wise Traffic" },
      { value: "pageViews", label: "Page Views" },
      { value: "devices", label: "Devices" },
    ],
  },
];

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
      { value: "/", label: "Home" },
      { value: "/about-us", label: "about us" },
      { value: "/contact-us", label: "contact us" },
      { value: "/clients", label: "clients" },
      { value: "/media-center", label: "media center" },
      { value: "/news", label: "news" },
      { value: "/services", label: "services" },
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

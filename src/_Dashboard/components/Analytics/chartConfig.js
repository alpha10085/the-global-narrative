// devices Icons
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";

// os Icons
import { AndroidIcon, IosIcon, ChromeIcon, EdgeIcon, FirefoxIcon, LinuxIcon, MobileIcon, SafariIcon, UnknownIcon, WindowsIcon } from "./icons";

export const chartConfig = {
  dailyTraffic: { title: "Daily Traffic", type: "line" },
  country: { title: "Country-wise Traffic", type: "bar" },
  pageViews: { title: "Page Views", type: "table" },
  devices: { title: "Devices", type: "pie" },
};

// Maps known country names to ISO Alpha-2 codes for flags
export const countryMap = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  Antigua: "AG",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  Bosnia: "BA",
  Botswana: "BW",
  Brazil: "BR",
  Brunei: "BN",
  Bulgaria: "BG",
  Burkina: "BF",
  Burundi: "BI",
  "Cabo Verde": "CV",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  Congo: "CG",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  Eswatini: "SZ",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  Korea: "KR",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Micronesia: "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Korea": "KP",
  "North Macedonia": "MK",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  Samoa: "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Togo: "TG",
  Tonga: "TO",
  "Trinidad and Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  UK: "GB",
  "United States": "US",
  USA: "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  "Vatican City": "VA",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
  null: "unknown",
};
export const getCountryCode = (country) => {
  if (!country || typeof country !== "string") return "unknown";

  const normalized = country.trim();

  // Return mapped value or assume it's already an ISO Alpha-2 code
  return countryMap[normalized] || normalized;
};

// devices
export const deviceMap = {
  mobile: { label: "Mobile", icon: <SmartphoneIcon /> },
  tablet: { label: "Tablet", icon: <TabletMacIcon /> },
  desktop: { label: "Desktop", icon: <DesktopWindowsIcon /> },
  unknown: { label: "Unknown", icon: <DeviceUnknownIcon /> },
};
export const getDeviceInfo = (raw = "") => {
  const key = raw?.toLowerCase?.() || "unknown";
  return deviceMap[key] || deviceMap["unknown"];
};

// os
export const osMap = {
  windows: { label: "Windows", icon: <WindowsIcon /> },
  macos: { label: "macOS", icon: <IosIcon /> },
  ios: { label: "iOS", icon: <IosIcon /> },
  android: { label: "Android", icon: <AndroidIcon /> },
  linux: { label: "Linux", icon: <LinuxIcon /> },
  unknown: { label: "Unknown", icon: <UnknownIcon /> },
};
export const getOSInfo = (os = "") => {
  const key = os?.toLowerCase() || "unknown";
  return osMap[key] || osMap["unknown"];
};



// browsers
export const browserMap = {
  chrome: { label: "Chrome", icon: <ChromeIcon /> },
  edge: { label: "Edge", icon: <EdgeIcon /> },
  "mobile safari": { label: "Mobile Safari", icon: <MobileIcon /> },
  firefox: { label: "Firefox", icon: <FirefoxIcon /> },
  safari: { label: "Safari", icon: <SafariIcon /> },
  "mobile chrome": { label: "Mobile Chrome", icon: <MobileIcon /> },
  unknown: { label: "Unknown", icon: <MobileIcon /> },
};

export const getBrowserInfo = (name = "") => {
  const key = name.toLowerCase();
  return browserMap[key] || browserMap["unknown"];
}
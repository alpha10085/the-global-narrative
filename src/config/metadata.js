const metadata = {
  title: process.env.NEXT_PUBLIC_project_name,
  description: "Welcome",
  other: {
    "color-scheme": "light ",
    "supported-color-schemes": "light",
  },
};
const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const main = {
  metadata,
  viewport,
};
export default main;




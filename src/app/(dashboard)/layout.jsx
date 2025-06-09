import Sidebar from "@/_Dashboard/components/Sidebar/Sidebar";
import Wrapper from "@/_Dashboard/components/boxs/Wrapper/wrapper";
import "@/_Dashboard/services/themes/dark.theme.css";
import "@/_Dashboard/services/themes/light.theme.css";
import "@/_Dashboard/configuration/styles/main.css";
import FileUploadCTX from "@/_Dashboard/components/Media/UploadFile/ContextApi/FileUploadCTX";
import ToasterComponent from "@/_Dashboard/components/Toaster/Toster";
import ThemeCTX from "@/_Dashboard/context/ThemeCTX";
import { cookies } from "next/headers";
export const generateMetadata = () => {
  return {
    title: "Workspace",
    description: "Workspace",
  };
};
export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore?.get("theme")?.value;
  return (
    <ThemeCTX initValue={theme}>
      <FileUploadCTX>
        <Sidebar />
        <Wrapper>{children}</Wrapper>
        <ToasterComponent />
      </FileUploadCTX>
    </ThemeCTX>
  );
}

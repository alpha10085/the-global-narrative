import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import Spinner from "@/componentss/Shared/Spinner/Spinner";

const LoaderLayout = ({ style, secondBackground =false }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        height: "100vh",
        ...style,
      }}
      className={`w-100 flex-c  ${secondBackground ? theme?.bg200 : ""}`}
    >
      <Spinner theme={theme?.name} />
    </div>
  );
};

export default LoaderLayout;

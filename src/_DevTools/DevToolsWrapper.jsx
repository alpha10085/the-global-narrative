import { isProductionMode } from "@/config/main";
import interceptor from "@/utils/consoleProxy";
import DevToolsClient from "./DevToolsClient";

const DevToolsWrapper = ({ children }) => {
  if (isProductionMode) return children;

  const logs = interceptor.getLogs();

  return (
    <DevToolsClient logStore={logs}>
      {children}
    </DevToolsClient>
  );
};

export default DevToolsWrapper;

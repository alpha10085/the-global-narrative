import interceptor from "@/utils/consoleProxy";
import DevTools from "./DevTools";
import { isProductionMode } from "@/config/main";
const DevToolsWrapper = async ({ children }) => {
  if (isProductionMode) return children;
  const logs = interceptor.getLogs();
  return <DevTools logStore={logs}>{children}</DevTools>;
};

export default DevToolsWrapper;

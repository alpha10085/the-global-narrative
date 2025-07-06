import { isProductionMode } from "@/config/main";
import interceptor from "@/utils/consoleProxy";
import DevToolsClient from "./DevToolsClient";
import DisableLogs from "@/components/Shared/DisableLogs/DisableLogs";

const DevToolsWrapper = ({ children }) => {
  if (isProductionMode)
    return (
      <>
        {children}
        <DisableLogs />
      </>
    );

  const logs = interceptor.getLogs();
  return <DevToolsClient logStore={logs}>{children}</DevToolsClient>;
};

export default DevToolsWrapper;

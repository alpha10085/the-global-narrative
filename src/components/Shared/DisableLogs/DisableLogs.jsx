import CSR from "./CSR/CSR";
import { disableConsole } from "./helpers";

const DisableLogs = () => {
  disableConsole();
  return <CSR />;
};

export default DisableLogs;

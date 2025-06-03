import { useEffect, useState } from "react";
import styles from "./ComponentName.module.css";
function formatComponentName(input, baseName) {
    if (!input) return "";

    function toPascalCase(text) {
        return text
            .replace(/[\[\]()]/g, "") // Remove brackets and parentheses
            .split("-")
            .filter(Boolean)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
    }

    const formattedBase = baseName ? toPascalCase(baseName) : "";
    
    // Handle [test] → AuthDetails
    if (/^\[.+\]$/.test(input)) {
        return formattedBase + "Details";
    }
    
    // Handle (test) → TestAuthDetails
    if (/^\(.+\)$/.test(input)) {
        return toPascalCase(input) + formattedBase + "Details";
    }

    return toPascalCase(input);
}



const ComponentName = ({
    onChange=() => {},
    name, enabled = false, parentname = "home" }) => {
  const [componentName, setComponentName] = useState("");
  useEffect(() => {
    if (enabled) {
      const nameAfterFormated = formatComponentName(name, parentname);
      setComponentName(nameAfterFormated);
      onChange(nameAfterFormated)
    } else {
      setComponentName("");
    }
  }, [enabled, name]);
  return (
    <div className={`${styles.container} flex-c`}>
      {componentName}
    </div>
  );
};

export default ComponentName;

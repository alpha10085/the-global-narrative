import useDynamicState from "@/hooks/useDynamicState";
import styles from "./CopyableText.module.css";

const CopyableText = ({ onCopy = "", text = "", className }) => {
  const defualtState = {
    enabled: false,
    copied: false,
  };
  const [state, setState] = useDynamicState(defualtState);
  const handleClick = async () => {
    try {
      navigator.clipboard.writeText(onCopy || text);
    } catch (error) {}
    setState({
      copied: true,
    });
  };
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() =>
        setState({
          enabled: true,
        })
      }
      onMouseLeave={() =>
        setState({
          enabled: false,
          copied: false,
        })
      }
      className={`${styles.CopyableText} ${className}`}
    >
      <div className={`${styles.window} ${state.enabled && styles.enabled}`}>
        <div className={styles.body}>
          {state.copied ? "copied!" : "Click to copy"}
        </div>
      </div>
      {text}
    </div>
  );
};

export default CopyableText;

import useDynamicState from "@/hooks/useDynamicState";
import styles from "./ServerActions.module.css";
import { ChangeProjectMode, makeServerAction } from "@/lib/tools";

const ServerActions = () => {
  const [state, setState] = useDynamicState({
    projectMode: process.env.NEXT_PUBLIC_MODE,
  });

  const handleModeChange = async (key) => {
    setState({
      projectMode: key,
    });
    await ChangeProjectMode(key);
  };

  const serverAction = async (action) => {
    try {
      await makeServerAction(action);
    } catch (error) {}
  };
  return (
    <div className={`${styles.container} flex gap20 wrap showSmooth`}>
      <div className={styles.projectmode}>
        <h1 className={styles.title}>project mode</h1>
        <div className={`${styles.options} flex al-i-c  gap20`}>
          <div
            onClick={() => handleModeChange("dev")}
            className={`${styles.option} ${styles.dev} flex-c ${
              state.projectMode === "dev" ? styles.active : ""
            } `}
          >
            Development
          </div>
          <div
            onClick={() => handleModeChange("pro")}
            className={`${styles.option} flex-c   ${styles.pro} ${
              state.projectMode === "pro" ? styles.active : ""
            }`}
          >
            Production
          </div>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <h1 className={styles.title}>stop server</h1>

        <div
          onClick={() => serverAction("stop-server")}
          className={`${styles.btn}  ${styles.warn} flex-c `}
        >
          Stop
        </div>
      </div>
    </div>
  );
};

export default ServerActions;

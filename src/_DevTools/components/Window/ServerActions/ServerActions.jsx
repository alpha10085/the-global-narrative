import useDynamicState from "@/hooks/useDynamicState";
import styles from "./ServerActions.module.css";
import { ChangeProjectMode, makeServerAction } from "@/lib/tools";
import { useRouter } from "next/navigation";
import { delay } from "@/utils/delay";
import Switch from "../Components/Switch/Switch";

const ServerActions = () => {
  const [state, setState] = useDynamicState({
    projectMode: process.env.NEXT_PUBLIC_MODE,
  });

  const router = useRouter();
  const handleModeChange = async (key) => {
    setState({
      projectMode: key,
    });
    await ChangeProjectMode(key);
  };

  const serverAction = async (action) => {
    try {
      await makeServerAction(action);
      if (action?.includes("revalidate")) {
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <div className={`${styles.container} flex gap20 wrap showSmooth`}>
      <Switch
        firstOption={{
          onClick: () => handleModeChange("dev"),
          isActive: state.projectMode === "dev",
          label: "Development",
        }}
        secendOption={{
          onClick: () => handleModeChange("pro"),
          isActive: state.projectMode === "pro",
          label: "Production",
        }}
      />
      <div className={styles.btnWrapper}>
        <h1 className={styles.title}>stop server</h1>

        <div
          onClick={() => serverAction("stop-server")}
          className={`${styles.btn}  ${styles.warn} flex-c `}
        >
          Stop
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <h1 className={styles.title}>next cache </h1>

        <div
          onClick={() => serverAction("revalidate-next-cache")}
          className={`${styles.btn}   flex-c `}
        >
          revalidate
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <h1 className={styles.title}>images cache </h1>

        <div
          onClick={() => serverAction("revalidate-images-cache")}
          className={`${styles.btn}   flex-c `}
        >
          revalidate
        </div>
      </div>
    </div>
  );
};

export default ServerActions;

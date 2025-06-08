import useDynamicState from "@/hooks/useDynamicState";
import styles from "./Localization.module.css";
import SectionLabel from "../Components/SectionLabel/SectionLabel";
import config from "@/i18n/config";
import { useRouter } from "next/navigation";
import Switch from "../Components/Switch/Switch";
import { updatei18Strategy } from "@/lib/tools";
import { delay } from "@/utils/delay";
import ListControl from "./components/ListControl/ListControl";

const Localization = () => {
  const [state, setState] = useDynamicState({
    strategy: config.route,
    loading: false,
  });
  const router = useRouter();

  const handleChangestrategy = async (newVal) => {
    try {
      setState({
        loading: true,
      });

      await updatei18Strategy(newVal);
      setState({
        strategy: newVal,
      });
    } catch (error) {
    } finally {
      setState({
        loading: false,
      });
    }
  };

  return (
    <div className={`${styles.container} flex gap10 wrap showSmooth`}>
      <SectionLabel label={"strategy"} />
      <Switch
        secendOption={{
          onClick: () => handleChangestrategy(false),
          isActive: !state?.strategy,
          label: "without routing",
        }}
        firstOption={{
          onClick: () => handleChangestrategy(true),
          isActive: state?.strategy,
          label: "with routing",
        }}
      />
      <SectionLabel label={"locales"} />
      <ListControl />
    </div>
  );
};

export default Localization;

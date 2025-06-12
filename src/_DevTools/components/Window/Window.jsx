"use client";
import useDisableScroll from "@/hooks/useDisableScroll";
import styles from "./Window.module.css";
import {
  ComponentIcon,
  ConsoleIcon,
  PageIcon,
  ServerIcon,
  SettingIcon,
} from "./Icons";
import PageTools from "./PageTools/PageTools";
import ComponentTools from "./ComponentTools/ComponentTools";
import ServerActions from "./ServerActions/ServerActions";
import { useRef } from "react";
import { delay } from "@/utils/delay";
import useDynamicState from "@/hooks/useDynamicState";
import ConsoleTools from "./ConsoleTools/ConsoleTools";
import SettingsTools from "./SettingsTools/SettingsTools";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PublicIcon from '@mui/icons-material/Public';
import Item from "./components/Item/Item";
import Localization from "./Localization/Localization";
import Link from "next/link";
const list = [
  {
    key: "page",
    label: "Create Page",
    Icon: <PageIcon />,
    scaleOnActive: true,
    children: <PageTools />,
  },
  {
    key: "component",
    label: "Create Component",
    Icon: <ComponentIcon />,

    scaleOnActive: true,
    children: <ComponentTools />,
  },

  {
    key: "setting",
    label: "settings",
    scaleOnActive: false,
    Icon: <SettingIcon />,
    children: <SettingsTools />,
    scaleOnActive: true,
  },
  {
    key: "console",
    label: "Console",
    scaleOnActive: false,
    Icon: <ConsoleIcon />,
    children: <ConsoleTools />,
  },

  {
    key: "server",
    label: "server Actions",
    Icon: <ServerIcon />,
    scaleOnActive: false,
    children: <ServerActions />,
  },
    {
    key: "localization",
    label: "localization",
    Icon: <PublicIcon />,
    scaleOnActive: false,
    children: <Localization />,
  },
];
function hasTrueValue(obj) {
  return Object.values(obj).includes(true);
}

const Window = ({ onClose = () => {}, show }) => {
    const {
    
  } = useDisableScroll(true);
  const [state, setState] = useDynamicState(
    list?.reduce((prev, cur, i) => {
      prev[cur?.key] = false;
      return prev;
    }, {})
  );

  const containerRef = useRef(null);

  const scrollToElement = async (id) => {
    await delay(250);
    const target = document.getElementById(id);
    if (containerRef.current && target) {
      containerRef.current.scrollTo({
        top: target.offsetTop - containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const activeScale = hasTrueValue(state);

  const onFoucs = (value, val) => {
    
    setState({
      [val?.key]: value ? val?.scaleOnActive : false,
    });
    if (value) {
      delay(250).then(() => scrollToElement(val?.key));
    }
  };
  const onUnFoucs = async (val) => {
    await delay(350)
    setState({
      [val?.key]: false,
    });
  };

  return (
    <>
      <div onClick={onClose} className={` showSmooth_c ${styles.blurbg}`} />
      <div
        style={{
          color: "white",
        }}
        className={`${styles.container} ${activeScale && styles.scaleOnActive} 
        ${show ? styles.show : styles.hide}
        `}
      >
        <div className="flex just-sb al-i-c">
          <h1 className={`${styles.title}`}>Tools</h1>
          <Link
            href={"/dashboard"}
            onClick={onClose}
            className={`${styles.dashboardLink} flex-c t-ca gap5`}
          >
            {" Dashboard"}
            <span className="flex-c">
              <ArrowOutwardIcon />
            </span>
          </Link>
        </div>
        <div
          id="modal"
          ref={containerRef}
          className={`${styles.list} flex column gap10`}
        >
          {list?.map((val) => (
            <Item
              id={val?.key}
              onFoucs={(value) => onFoucs(value, val)}
              onUnFoucs={() => onUnFoucs(val)}
              val={val}
              key={val?.key}
            >
              {val?.children}
            </Item>
          ))}
        </div>
      </div>
    </>
  );
};

export default Window;

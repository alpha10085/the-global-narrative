"use client";
import { useEffect, useState } from "react";
import styles from "./Welcome.module.css";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import useTranslations from "@/hooks/useTranslations";
const Welcome = () => {
  const { theme } = useTheme();
  const [indexEvent, setIndexEvent] = useState(0);
  useEffect(() => {
    HandleAnimationEvents();
  }, []);
  const HandleAnimationEvents = () => {
    setTimeout(() => {
      setIndexEvent(1);
      HandleSecEvent();
    }, 800);
  };
  const HandleSecEvent = () => {
    setTimeout(() => {
      setIndexEvent(2);
      setTimeout(() => {
        cardEvents();
      }, 500);
    }, 500);
  };
  const cardEvents = async () => {
    for (const val of [1, 2, 3, 4]) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setIndexEvent((prev) => prev + 1);
          resolve();
        }, 500);
      });
    }
  };


  const translations = useTranslations("Dashboard.Welcome", [
    "title",
    "subtitle",
    "description",
    "Safetitle",
    "Safedesc",
    "StayHydratedtitle",
    "StayHydrateddesc",
    "Powerfultitle",
    "Powerfuldesc",
    "HighAutoFixtitle",
    "HighAutoFixdesc",
  ]);
  
  const list = [
    {
      _id: 1,
      icon: <PsychologyIcon />,
      title: translations?.Safetitle,
      desc: translations?.Safedesc,
    },
    {
      _id: 2,
      icon: <NightsStayIcon />,
      title: translations?.StayHydratedtitle,
      desc: translations?.StayHydrateddesc,
    },
    {
      _id: 3,
      icon: <ElectricBoltIcon />,
      title:  translations?.Powerfultitle,
      desc: translations?.Powerfuldesc,
    },
    {
      _id: 4,
      icon: <AutoFixHighIcon />,
      title: translations?.HighAutoFixtitle,
      desc: translations?.HighAutoFixdesc,
    },
  ];
  return (
    <section className={``}>
      <div className={styles.section}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{translations?.title}</h1>
        </div>
        {indexEvent >= 1 && (
          <div className={styles.titleBox}>
            <h1 className={styles.title}>{translations?.subtitle}</h1>
          </div>
        )}
        {indexEvent >= 2 && (
          <div className={`ml-5 ${styles.desc} showSmooth `}>
            <p>{translations?.description}</p>
          </div>
        )}
      </div>
      <div className={`${styles.list} flex column wrap gap20  mb-50 `}>
        {list?.map((item, index) => {
          if (index + 2 >= indexEvent) return null;
          return (
            <div
              key={item?._id}
              className={`${styles.Card} ${
                theme?.name === "light" && styles.light
              } showSmooth  ${theme.bord20}`}
            >
              <div className={`${styles.top} flex al-i-c gap10`}>
                <div className={`${styles.left} flex-c`}>{item?.icon}</div>
                <div className={styles.right}>
                  <h1>{item?.title}</h1>
                </div>
              </div>
              <div className={styles.bottom}>
                <p>{item?.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Welcome;

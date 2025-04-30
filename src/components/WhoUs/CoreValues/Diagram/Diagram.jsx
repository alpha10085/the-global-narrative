import React from "react";
import styles from "./Diagram.module.css";
import ShadowBg from "@/components/ShadowBg/ShadowBg";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import {
  LightbulbIcon,
  PeopleIcon,
  TrendingUpIcon,
  RocketLaunchIcon,
} from "@/components/WhoUs/CoreValues/Icons";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const iconMap = {
  "01": <LightbulbIcon />,
  "02": <PeopleIcon />,
  "03": <TrendingUpIcon />,
  "04": <RocketLaunchIcon />,
  "05": <WorkspacePremiumIcon />,
};

const Diagram = ({ data = {}, activeIndex = 0, activeColor = "white" }) => {
  return (
    <>
      {/* Diagram */}
      <Aos
        className={styles.diagramContainer}
        activeClassName={styles.rotateDiagram}
        triggerOnce={true}
      >
        {/* Shadow Background */}
        <ShadowBg
          className={styles.background}
          color={activeColor}
          width={`30vw`}
        />
        <div className={styles.circleWrapper}>
          <div className={styles.diagram}>
            <div className={styles.centerText}></div>
            {data?.points?.map((value, index) => (
              <div
                key={value?._id}
                className={`${styles.valueCircle} ${
                  styles[`circle${index + 1}`]
                } ${index === activeIndex ? styles.activeCircle : ""}`}
              >
                <div className={styles.icon}>{iconMap?.[value?._id]}</div>{" "}
                <div className={styles.iconNumber}>{`0${index + 1}`}</div>
              </div>
            ))}
          </div>
        </div>
      </Aos>
    </>
  );
};

export default Diagram;

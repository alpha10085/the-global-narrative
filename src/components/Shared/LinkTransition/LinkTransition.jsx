"use client";
import styles from "./LinkTransition.module.css";

import { useTransitionRouter } from "next-view-transitions";
import {
  fadeInOut,
  slideInOut,
  slideLeftRight,
  slideToTop,
  zoomInOut,
} from "./animtions";
const LinkTransition = ({ children, ...props }) => {
  const router = useTransitionRouter();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        router.push(props.href, {
          onTransitionReady: slideToTop,
        });
      }}
      href=""
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkTransition;

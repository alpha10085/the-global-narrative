"use client";

import { useEffect, useState } from "react";

import React from "react";
import Intro from "./Intro/Intro";

const ClientWrapper = ({ children }) => {
  const [showIntro, setShowIntro] = useState(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("intro-shown");

    if (hasVisited) {
      setShowIntro(true);
    } else {
      setShowIntro(true);
      const timer = setTimeout(() => {
        sessionStorage.setItem("intro-shown", "true");
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showIntro === null) return children;
  if (showIntro) return <Intro />;

  return children;
};

export default ClientWrapper;

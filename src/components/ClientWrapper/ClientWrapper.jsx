"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro/Intro";

const ClientWrapper = ({ children }) => {
  const [showIntro, setShowIntro] = useState(null);
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("intro-shown");

    if (hasVisited) {
      setShowIntro(false);
    } else {
      setShowIntro(true);
      const timer = setTimeout(() => {
        setHideIntro(true); // trigger fade out
        sessionStorage.setItem("intro-shown", "true");
      }, 3000); // after 3s of intro

      return () => clearTimeout(timer);
    }
  }, []);

  const handleHideEnd = () => {
    setShowIntro(false); // remove intro after animation ends
  };

  if (showIntro === null) return children;
  if (showIntro) {
    return <Intro hide={hideIntro} onHideEnd={handleHideEnd} />;
  }

  return children;
};

export default ClientWrapper;

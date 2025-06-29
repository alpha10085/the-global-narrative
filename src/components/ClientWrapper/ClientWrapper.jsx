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

  if (showIntro === null) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(-45deg, #000428, #000, #000428, #000)",
          backgroundSize: "400% 400%",
          animation: "gradientMove 8s ease infinite",
          zIndex: 9999,
        }}
      />
    );
  } // wait until checked
  
  if (showIntro) {
    return <Intro hide={hideIntro} onHideEnd={handleHideEnd} />;
  }
  return children;
};

export default ClientWrapper;

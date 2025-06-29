"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro/Intro";

const ClientWrapper = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const hasVisited = sessionStorage.getItem("intro-shown");

    if (!hasVisited) {
      setShowIntro(true);
      const timer = setTimeout(() => {
        setHideIntro(true); // trigger fade out
        sessionStorage.setItem("intro-shown", "true");
      }, 3500); // 3s intro duration

      return () => clearTimeout(timer);
    }
  }, []);

  const handleHideEnd = () => {
    setShowIntro(false); // remove Intro from DOM after fade
  };

  // Prevent rendering *anything* until after hydration
  if (!hasMounted) {
    return null;
  }

  // Show intro if it's the first visit
  if (showIntro) {
    return <Intro hide={hideIntro} onHideEnd={handleHideEnd} />;
  }

  // Show actual page content
  return children;
};

export default ClientWrapper;



/*
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

*/
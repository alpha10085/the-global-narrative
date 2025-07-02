"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro/Intro";

const ClientWrapper = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const hasVisited = false && sessionStorage.getItem("intro-shown");

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




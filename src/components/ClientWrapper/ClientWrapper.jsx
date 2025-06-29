"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro/Intro";

const ClientWrapper = ({ children }) => {
  const [hydrated, setHydrated] = useState(false); // block until sessionStorage read
  const [showIntro, setShowIntro] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("intro-shown");

    if (hasVisited) {
      setShowIntro(false);
    } else {
      setShowIntro(true);
      const timer = setTimeout(() => {
        setHideIntro(true);
        sessionStorage.setItem("intro-shown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }

    setHydrated(true); // mark hydration after decision
  }, []);

  const handleHideEnd = () => {
    setShowIntro(false);
  };

  // Don't render anything until hydration check finishes
  if (!hydrated && !showIntro) return null;

  //  Intro should appear
  if (showIntro) {
    return <Intro hide={hideIntro} onHideEnd={handleHideEnd} />;
  }

  //  Show children
  return children;
};

export default ClientWrapper;

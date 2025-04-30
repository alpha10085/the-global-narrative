"use client";
import { createContext, useContext, useState } from "react";
const AnimtionContext = createContext();

export const AnimtionProvider = ({ children }) => {
  const [headerEvent, setHeaderEvent] = useState(false); // Resets on refresh

  const onEventEnd = () => {
    setHeaderEvent(true);
  };
  return (
    <AnimtionContext.Provider value={{ headerEvent, onEventEnd }}>
      {children}
    </AnimtionContext.Provider>
  );
};

export const useAnimtionCTX = () => {
  const { headerEvent = false, onEventEnd = () => {} } =
    useContext(AnimtionContext) || {};
  return {
    headerEvent,
    onEventEnd,
  };
};

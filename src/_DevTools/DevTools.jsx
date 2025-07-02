"use client";
import useDynamicState from "@/hooks/useDynamicState";
import Icon from "./components/Icon/Icon";
import Window from "./components/Window/Window";
import useLocalStorage from "@/hooks/useLocalStorage";
import ConsolePopup from "./Tools/ConsolePopup/ConsolePopup";
import { memo, useEffect } from "react";
const DevTools = ({ logStore, children }) => {
  const [state, setState] = useDynamicState({
    enable_window: false,
    isClient: false,
  });
  const { enable_window } = state;
  const closeWindow = () => {
    setState({
      enable_window: false,
    });
  };

  const { createOrUpdate, isLoading, data } =
    useLocalStorage("dev-tools-settings");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "y") {
        event.preventDefault(); // prevent default Ctrl+Y behavior (redo in some browsers/editors)
        createOrUpdate({
          ...data,
          enabled: true,
        });
        setState({
          enable_window: true,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  if (isLoading) return null;

  const displayIcon = data?.enabled || typeof data?.enabled !== "boolean";

  return (
    <>
      <ConsolePopup
        logStore={logStore}
        onMouned={() => setState({ isClient: true })}
      />
      {enable_window && <Window onClose={closeWindow} />}

      <Icon
        enebaled={displayIcon}
        onClick={() => setState({ enable_window: !enable_window })}
      />

      {children}
    </>
  );
};

export default memo(DevTools, () => true);

"use client";
import useDynamicState from "@/hooks/useDynamicState";
import Icon from "./components/Icon/Icon";
import Window from "./components/Window/Window";
import useLocalStorage from "@/hooks/useLocalStorage";
import ConsolePopup from "./Tools/ConsolePopup/ConsolePopup";
import { memo, useEffect } from "react";
import useKeyboard from "@/hooks/useKeyboard";
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

  useKeyboard([
    {
      key: "y",
      ctrl: true,
      callback: () => {
        createOrUpdate({ ...data, enabled: true });
        setState({ enable_window: true });
      },
    },
    {
      key: "U",
      ctrl: true,
      callback: () => {
        setState({ enable_window: false });
        if (!enable_window) {
          createOrUpdate({ ...data, enabled: false });
        }
      },
    },
  ]);

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

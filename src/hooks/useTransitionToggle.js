import { useRef, useCallback } from "react";
import useDynamicState from "./useDynamicState";
import { delay } from "@/utils/delay";

const useTransitionToggle = ({
  openDelay = 50,
  closeDelay = 400,
  defaultOpen = false,
} = {}) => {
  const [{ isOpen, isHidden }, setState] = useDynamicState({
    isOpen: defaultOpen,
    isHidden: !defaultOpen,
  });

  // Holds a chain of transitions
  const queueRef = useRef(Promise.resolve());

  const enqueue = useCallback((fn) => {
    queueRef.current = queueRef.current.then(fn).catch(() => {});
  }, []);

  const open = useCallback(() => {
    enqueue(async () => {
      if (isOpen) return;
      setState({ isHidden: false, isOpen: false });
      await delay(openDelay);
      setState({ isOpen: true });
    });
  }, [isOpen, openDelay, setState]);

  const close = useCallback(() => {
    enqueue(async () => {
      if (!isOpen) return;
      setState({ isOpen: false });
      await delay(closeDelay);
      setState({ isHidden: true });
    });
  }, [isOpen, closeDelay, setState]);

  const toggle = useCallback(() => {
    enqueue(async () => {
      if (isOpen) {
        setState({ isOpen: false });
        await delay(closeDelay);
        setState({ isHidden: true });
      } else {
        setState({ isHidden: false, isOpen: false });
        await delay(openDelay);
        setState({ isOpen: true });
      }
    });
  }, [isOpen, openDelay, closeDelay, setState]);

  return {
    isOpen,
    isHidden,
    open,
    close,
    toggle,
  };
};

export default useTransitionToggle;

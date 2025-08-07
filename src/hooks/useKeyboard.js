import { useEffect } from "react";

/**
 * @param {Array} bindings - List of key bindings, each with a `key`, optional modifiers, and its own `callback`.
 * Example:
 * [
 *   { key: "Enter", callback: () => {} },
 *   { key: "y", ctrl: true, callback: () => {} }
 * ]
 */
const useKeyboard = (bindings = []) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      for (const binding of bindings) {
        const {
          key,
          callback,
          ctrl = false,
          shift = false,
          alt = false,
          meta = false,
        } = binding;

        const match =
          event?.key?.toLowerCase() === key?.toLowerCase() &&
          event.ctrlKey === ctrl &&
          event.shiftKey === shift &&
          event.altKey === alt &&
          event.metaKey === meta;

        if (match) {
          event.preventDefault();
          callback?.();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bindings]);
};

export default useKeyboard;
